import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputText from '@/Components/InputText';

export default function AddAppointment({auth}) {
    const { data, setData, post, processing, errors } = useForm({
        patientId: auth.user.id,
        patientName: auth.user.name,
        date: null,
        hours: null,
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add appointment</h2>}
        >
            <Head title="Add appointment" />

            <div className="card card-side bg-base-100 shadow-xl mx-5 my-5">
                <div className="card-body">
                    <h2 className="card-title">Input appointment data here</h2>
                    <form onSubmit={submit}>
                        <InputText label="Tanggal" type="date" onChange={(e) => setData("date", e.target.value)}></InputText>
                        <InputText label="Jam" type="time" onChange={(e) => setData("hours", e.target.value)}></InputText>
                        <button type="submit" className="btn btn-success my-6" disabled={processing}>Request appointment</button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}