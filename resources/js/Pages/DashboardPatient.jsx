import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, diagnose }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="flex justify-center my-10">
            <div className="card card-side bg-base-100 shadow-xl mx-5">
                <div className="card-body">
                    <h2 className="card-title">Informasi pasien</h2>
                    <img src="../img/logo.png" alt="" className='max-w-28 mt-5'/>
                    <div className="grid grid-cols-3 gap-8 my-5">
                        <div>
                            <p className='font-bold'>Patient ID</p>
                            <p>{auth.user.id}</p>
                        </div>
                        <div>
                            <p className='font-bold'>Nama</p>
                            <p>{auth.user.name}</p>
                        </div>
                        {diagnose != null ? 
                            <>
                                <div>
                                    <p className='font-bold'>Sex</p>
                                    <p>{diagnose.Sex ?? ''}</p>
                                </div>
                                <div>
                                    <p className='font-bold'>Age</p>
                                    <p>{diagnose.Age ?? ''}</p>
                                </div>
                                <div>
                                    <p className='font-bold'>Rhythms</p>
                                    <p>{diagnose.Rhythms ?? ''}</p>
                                </div>
                                <div>
                                    <p className='font-bold'>Electric axis of the heart</p>
                                    <p>{diagnose.Electric_axis_of_the_heart ?? ''}</p>
                                </div>
                                <div>
                                    <p className='font-bold'>Conduction abnormalities</p>
                                    <p>{diagnose.Conduction_abnormalities ?? ''}</p>
                                </div>
                                <div>
                                    <p className='font-bold'>Extrasystolies</p>
                                    <p>{diagnose.Extrasystolies ?? ''}</p>
                                </div>
                                <div>
                                    <p className='font-bold'>Hypertrophies</p>
                                    <p>{diagnose.Hypertrophies ?? ''}</p>
                                </div>
                                <div>
                                    <p className='font-bold'>Cardiac pacing</p>
                                    <p>{diagnose.Cardiac_pacing ?? ''}</p>
                                </div>
                                <div>
                                    <p className='font-bold'>Ischemia</p>
                                    <p>{diagnose.Ischemia ?? ''}</p>
                                </div>
                                <div>
                                    <p className='font-bold'>Non-specific repolarization abnormalities</p>
                                    <p>{diagnose.Non_specific_repolarization_abnormalities ?? ''}</p>
                                </div>
                                <div>
                                    <p className='font-bold'>Other states</p>
                                    <p>{diagnose.Other_states ?? ''}</p>
                                </div>
                            
                            </>
                        : 
                            <>
                                <div>
                                    <p className='font-bold'>Sex</p>
                                    <p></p>
                                </div>
                                <div>
                                    <p className='font-bold'>Age</p>
                                    <p></p>
                                </div>
                                <div>
                                    <p className='font-bold'>Rhythms</p>
                                    <p></p>
                                </div>
                                <div>
                                    <p className='font-bold'>Electric axis of the heart</p>
                                    <p></p>
                                </div>
                                <div>
                                    <p className='font-bold'>Conduction abnormalities</p>
                                    <p></p>
                                </div>
                                <div>
                                    <p className='font-bold'>Extrasystolies</p>
                                    <p></p>
                                </div>
                                <div>
                                    <p className='font-bold'>Hypertrophies</p>
                                    <p></p>
                                </div>
                                <div>
                                    <p className='font-bold'>Cardiac pacing</p>
                                    <p></p>
                                </div>
                                <div>
                                    <p className='font-bold'>Ischemia</p>
                                    <p></p>
                                </div>
                                <div>
                                    <p className='font-bold'>Non-specific repolarization abnormalities</p>
                                    <p></p>
                                </div>
                                <div>
                                    <p className='font-bold'>Other states</p>
                                    <p></p>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>

            </div>

        </AuthenticatedLayout>
    );
}
