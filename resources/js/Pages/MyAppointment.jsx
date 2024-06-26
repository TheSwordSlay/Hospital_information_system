import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function MyAppointment({ auth, app }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My appointments</h2>}
        >
            <Head title="My appointments" />

            <div className="overflow-x-auto bg-white mx-5 my-5">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Tanggal appointment</th>
        <th>Jam appointment</th>
        <th>Nama dokter</th>
      </tr>
    </thead>
    <tbody>
      {/* row 2 */}
      {app.map((data, i) => 
        <tr className="hover" key={i}>
          <th>{i+1}</th>
          <td>{data.date}</td>
          <td>{data.hours}</td>
          <td>{data.doctorName}</td>
        </tr>)}
    </tbody>
  </table>
</div>
        </AuthenticatedLayout>
    );
}