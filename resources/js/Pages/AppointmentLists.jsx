import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import Swal from 'sweetalert2';


export default function AppointmentLists({ auth, app }) {
    function done(id) {
        var data = {
            idUpdate: id
        }
        Swal.fire({
            title: 'Anda yakin?',
            text: "Appointment yang sudah selesai akan hilang dari list appointment",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, saya yakin!'
          }).then((result) => {
            if (result.isConfirmed) {
                router.post("../update-done", data)
            }
          })
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Appointment lists</h2>}
        >
            <Head title="Appointment lists" />

            <div className="overflow-x-auto bg-white mx-5 my-5">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Patient id</th>
        <th>Patient name</th>
        <th>Appointment date</th>
        <th>Appointment hours</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 2 */}
      {app.map((data, i) => 
        <tr className="hover" key={i}>
          <th>{i+1}</th>
          <th>{data.patientId}</th>
          <th>{data.patientName}</th>
          <td>{data.date}</td>
          <td>{data.hours}</td>
          <button className="btn btn-success my-3" onClick={() => done(data.id)}>Selesai</button>
        </tr>)}
    </tbody>
  </table>
</div>
        </AuthenticatedLayout>
    );
}