import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputText from '@/Components/InputText';
import InputError from '@/Components/InputError';

export default function AddAppointment({auth, flash, doctors}) {
    const { data, setData, post, processing, errors } = useForm({
        patientId: auth.user.id,
        patientName: auth.user.name,
        date: null,
        hours: null,
        doctor: null
      })

      function submit(e) {
        e.preventDefault()
        post(route('add-app', data, {
          _method: 'POST'
        }));
      }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Make appointment</h2>}
        >
            <Head title="Make appointment" />

            <div className="card card-side bg-base-100 shadow-xl mx-5 my-5">
                <div className="card-body">
                    <h2 className="card-title">Input appointment data here</h2>
                    {flash.message == "0" ? 
                    <div role="alert" className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Dokter tidak tersedia pada hari dan jam tersebut</span>
                    </div>
                    :""}
                    {flash.message == "1" ? 
                    <div role="alert" className="alert alert-success">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Appointment berhasil dibuat</span>
                    </div>
                    :""}
                    
                    {flash.message?.substring(0,4) == "Appo" ? 
                    <div role="alert" className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{flash.message}</span>
                    </div>
                    :""}
                    <form onSubmit={submit}>
                        <InputText label="Tanggal" type="date" onChange={(e) => setData("date", e.target.value)}></InputText>
                        <InputError message={errors.date} className="mt-2" />
                        {/* <InputText label="Jam" type="time" onChange={(e) => setData("hours", e.target.value)}></InputText>
                        <InputError message={errors.hours} className="mt-2" /> */}

                        <label className="label">
                        <span className="label-text">Dokter</span>
                        </label>
                        <select className="select select-bordered w-full mb-3" onChange={(e) => setData("doctor", e.target.value)}>
                        <option disabled selected>Pilih dokter</option>
                            {doctors.map((data, i) => {
                                return <option key={i} value={data.id}>{data.name}</option>
                            })}
                        </select>
                        <InputError message={errors.doctor} className="mt-2" />

                        <label className="label">
                        <span className="label-text">Jam</span>
                        </label>
                        <select className="select select-bordered w-full" onChange={(e) => setData("hours", e.target.value)}>
                        <option disabled selected>Pilih jam</option>
                            <option>08:00</option>
                            <option>10:00</option>
                            <option>12:00</option>
                            <option>14:00</option>
                            <option>16:00</option>
                            <option>18:00</option>
                            <option>20:00</option>
                            <option>22:00</option>
                            <option>24:00</option>
                        </select>
                        <InputError message={errors.hours} className="mt-2" />
                        
                        <div></div>
                        <button type="submit" className="btn btn-success my-6" disabled={processing}>Request appointment</button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}