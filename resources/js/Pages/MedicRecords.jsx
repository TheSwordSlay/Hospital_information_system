import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import InputText from '@/Components/InputText';
import Swal from 'sweetalert2'

export default function Dashboard({ auth, records, flash }) {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [isNotif, setNotif] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
      ID: null,
      Sex: null,
      Age: null,
      Rhythms: null,
      Electric_axis_of_the_heart: null,
      Conduction_abnormalities: null,
      Extrasystolies: null,
      Hypertrophies: null,
      Cardiac_pacing: null,
      Ischemia: null,
      Non_specific_repolarization_abnormalities: null,
      Other_states: null,
    })

    useEffect(() => {
      if (!processing) {
        setLoading(false)
      }
    }, [processing]);

    useEffect(() => {
      if (flash.message != undefined) {
        setNotif(true)
      }
    }, [flash]);

    function submit(e) {
      e.preventDefault()
      setLoading(true)
      router.get("/store-records", data)
    }

    const confirmDelete = (i) => {
      Swal.fire({
          title: 'Anda yakin?',
          text: "Data yang sudah dihapus tidak bisa dikembalikan lagi",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, saya yakin!'
        }).then((result) => {
          if (result.isConfirmed) {
              router.get("../delete/"+i)
          }
        })
  }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Medical records</h2>}
        >
            <Head title="Medic records" />
            {flash.message != undefined && isNotif ? 
              <div className="flex justify-center mx-20">
                <div role="alert" className="alert alert-success mt-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>{flash.message}</span>
                  <div>
                    <button className="btn btn-sm btn-info" onClick={() => setNotif(false)}>Ok</button>
                  </div>
                </div>
              </div>
            : ""}

            <div className="flex justify-between mx-10">
            <input type="text" placeholder="Search patient ID" className="input input-bordered w-full max-w-xs my-10" onChange={e => setSearch(e.target.value)}/>
              <button className="btn btn-success my-10" onClick={()=>document.getElementById('add_record').showModal()}>Add medical record</button>
            </div>
            
            <div className="bg-white mx-10">
              <div className="overflow-x-auto max-h-96">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th>Patient id</th>
                      <th>Sex</th>
                      <th>Age</th>
                      <th>Rhythms</th>
                      <th>Electric axis of the heart</th>
                      <th>Conduction abnormalities</th>
                      <th>Extrasystolies</th>
                      <th>Hypertrophies</th>
                      <th>Cardiac pacing</th>
                      <th>Ischemia</th>
                      <th>Non-specific repolarization abnormalities</th>
                      <th>Other states</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 2 */}
                    
                    {records.map((data, i) => {
                      if(data.ID.toString().includes(search.toString())) {
                        return(                       
                        <tr className="hover" key={i}>
                          <th>
                            <Link href={"../edit-records/"+data.ID}><button className="btn btn-sm btn-warning">Edit</button></Link>
                          </th>
                          <th>
                            <button className="btn btn-sm btn-error" onClick={() => confirmDelete(data.ID)}>Delete</button>
                          </th>
                          <th>{data.ID}</th>
                          <th>{data.Sex}</th>
                          <th>{data.Age}</th>
                          <th>{data.Rhythms}</th>
                          <th>{data.Electric_axis_of_the_heart}</th>
                          <th>{data.Conduction_abnormalities}</th>
                          <th>{data.Extrasystolies}</th>
                          <th>{data.Hypertrophies}</th>
                          <th>{data.Cardiac_pacing}</th>
                          <th>{data.Ischemia}</th>
                          <th>{data.Non_specific_repolarization_abnormalities}</th>
                          <th>{data.Other_states}</th>
                      </tr>)
                      } else {
                        return ""
                      }
                    }
                    )}
                    
                  </tbody>
                </table>
              </div>
            </div>

            {/* modal */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="add_record" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Tambah medical record</h3>
                <form onSubmit={submit}>
                  <InputText label={'Patient id'} onChange={e => setData('ID', e.target.value)} onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}></InputText>
                  <InputText label={'Sex'} onChange={e => setData('Sex', e.target.value)}></InputText>
                  <InputText label={'Age'} onChange={e => setData('Age', e.target.value)} onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}></InputText>
                  <InputText label={'Rhythms'} onChange={e => setData('Rhythms', e.target.value)}></InputText>
                  <InputText label={'Electric axis of the heart'} onChange={e => setData('Electric_axis_of_the_heart', e.target.value)}></InputText>
                  <InputText label={'Conduction abnormalities'} onChange={e => setData('Conduction_abnormalities', e.target.value)}></InputText>
                  <InputText label={'Extrasystolies'} onChange={e => setData('Extrasystolies', e.target.value)}></InputText>
                  <InputText label={'Hypertrophies'} onChange={e => setData('Hypertrophies', e.target.value)}></InputText>
                  <InputText label={'Cardiac pacing'} onChange={e => setData('Cardiac_pacing', e.target.value)}></InputText>
                  <InputText label={'Ischemia'} onChange={e => setData('Ischemia', e.target.value)}></InputText>
                  <InputText label={'Non-specific repolarization abnormalities'} onChange={e => setData('Non_specific_repolarization_abnormalities', e.target.value)}></InputText>
                  <InputText label={'Other states'} onChange={e => setData('Other_states', e.target.value)}></InputText>

                  <div className="flex justify-between">
                    <button type="submit" className="btn btn-success mt-6" disabled={loading}>Submit</button>
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn" onClick={() => setLoading(false)}>Cancel</button>
                      </form>
                    </div>

                  </div>
                </form>

              </div>
            </dialog>
        </AuthenticatedLayout>
    );
}
