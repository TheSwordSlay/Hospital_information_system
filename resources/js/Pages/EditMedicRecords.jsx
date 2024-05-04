import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputText from '@/Components/InputText';

export default function EditMedicRecords({ auth, edit }) {
    const { data, setData, post, processing, errors } = useForm({
        initialId: edit.ID,
        ID: edit.ID,
        Sex: edit.Sex,
        Age: edit.Age,
        Rhythms: edit.Rhythms,
        Electric_axis_of_the_heart: edit.Electric_axis_of_the_heart,
        Conduction_abnormalities: edit.Conduction_abnormalities,
        Extrasystolies: edit.Extrasystolies,
        Hypertrophies: edit.Hypertrophies,
        Cardiac_pacing: edit.Cardiac_pacing,
        Ischemia: edit.Ischemia,
        Non_specific_repolarization_abnormalities: edit.Non_specific_repolarization_abnormalities,
        Other_states: edit.Other_states,
      })

      function submit(e) {
        e.preventDefault()
        post(route('update-records', data, {
          _method: 'POST'
        }));
      }


    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit medic records</h2>}
        >
            <Head title="Edit medic records" />
                <form onSubmit={submit} className='mx-10'>
                    <InputText label={'Patient id'} value={data.ID} onChange={e => setData('ID', e.target.value)} onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}></InputText>
                  <InputText label={'Sex'} value={data.Sex} onChange={e => setData('Sex', e.target.value)}></InputText>
                  <InputText label={'Age'} value={data.Age} onChange={e => setData('Age', e.target.value)} onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}></InputText>
                  <InputText label={'Rhythms'} value={data.Rhythms} onChange={e => setData('Rhythms', e.target.value)}></InputText>
                  <InputText label={'Electric axis of the heart'} value={data.Electric_axis_of_the_heart} onChange={e => setData('Electric_axis_of_the_heart', e.target.value)}></InputText>
                  <InputText label={'Conduction abnormalities'} value={data.Conduction_abnormalities} onChange={e => setData('Conduction_abnormalities', e.target.value)}></InputText>
                  <InputText label={'Extrasystolies'} value={data.Extrasystolies} onChange={e => setData('Extrasystolies', e.target.value)}></InputText>
                  <InputText label={'Hypertrophies'} value={data.Hypertrophies} onChange={e => setData('Hypertrophies', e.target.value)}></InputText>
                  <InputText label={'Cardiac pacing'} value={data.Cardiac_pacing} onChange={e => setData('Cardiac_pacing', e.target.value)}></InputText>
                  <InputText label={'Ischemia'} value={data.Ischemia} onChange={e => setData('Ischemia', e.target.value)}></InputText>
                  <InputText label={'Non-specific repolarization abnormalities'} value={data.Non_specific_repolarization_abnormalities} onChange={e => setData('Non_specific_repolarization_abnormalities', e.target.value)}></InputText>
                  <InputText label={'Other states'} value={data.Other_states} onChange={e => setData('Other_states', e.target.value)}></InputText>

                  <button type="submit" className="btn btn-success my-6" disabled={processing}>Update</button>
                </form>

        </AuthenticatedLayout>
    )
}