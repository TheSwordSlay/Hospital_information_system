<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Diagnoses;
use App\Http\Requests\StoreDiagnosesRequest;
use App\Http\Requests\UpdateDiagnosesRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Appointments;
use App\Models\User;

class DiagnosesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::user()->isDoctor == 0) {
            $diagnose = Diagnoses::where('ID', Auth::user()->id)->first();
            return Inertia::render('DashboardPatient', [
                'diagnose' => $diagnose
            ]);
        } else {
            $app = Appointments::where('isDone', false)->where('doctorId', Auth::user()->id)->get();
            $rec = Diagnoses::all();
            $user = User::where('isDoctor', false)->get();
            $totalAppointments = $app->count();
            $totalRecords = $rec->count();
            $totalPatient = $user->count();
            return Inertia::render('Dashboard', [
                'totalAppointments' => $totalAppointments,
                'totalRecords' => $totalRecords,
                'totalPatient' => $totalPatient
            ]);
        }

    }

    public function records()
    {
        $data = Diagnoses::orderBy('ID')->get();
        return Inertia::render('MedicRecords', [
            'records' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UpdateDiagnosesRequest $request)
    {
        $data = Diagnoses::orderBy('ID')->get();
        $request->validate([
            'ID' => "required|distinct",
            'Sex' => "required",
            'Age' => "required|integer",
       ]);

       Diagnoses::create($request->all());

       return to_route('records')->with('message', 'Data berhasil dibuat');
    }

    /**
     * Display the specified resource.
     */
    public function show(Diagnoses $diagnoses)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $edit = Diagnoses::where('ID', $id)->first();
        return Inertia::render('EditMedicRecords', [
            'edit' => $edit
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDiagnosesRequest $request)
    {
        Diagnoses::where('ID', $request->initialId)->update([
            'ID' => $request->ID,
            'Sex' => $request->Sex,
            'Age' => $request->Age,
            'Rhythms' => $request->Rhythms,
            'Electric_axis_of_the_heart' => $request->Electric_axis_of_the_heart,
            'Conduction_abnormalities' => $request->Conduction_abnormalities,
            'Extrasystolies' => $request->Extrasystolies,
            'Hypertrophies' => $request->Hypertrophies,
            'Cardiac_pacing' => $request->Cardiac_pacing,
            'Ischemia' => $request->Ischemia,
            'Non_specific_repolarization_abnormalities' => $request->Non_specific_repolarization_abnormalities,
            'Other_states' => $request->Other_states,
        ]);
        return to_route('records')->with('message', 'Data berhasil diedit');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = Diagnoses::where('ID', $id);
        // dd($data);
        $data->delete();
        return to_route('records');
    }
}
