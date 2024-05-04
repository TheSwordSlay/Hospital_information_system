<?php

namespace App\Http\Controllers;

use App\Models\Diagnoses;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\StoreDiagnosesRequest;
use App\Http\Requests\UpdateDiagnosesRequest;

class MainController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Diagnoses::all();
        return Inertia::render('Dashboard', [
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function records()
    {
        $data = Diagnoses::orderBy('ID')->get();
        return Inertia::render('MedicRecords', [
            'records' => $data
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = Diagnoses::orderBy('ID')->get();
        $request->validate([
            'ID' => "required|distinct",
            'Sex' => "required",
            'Age' => "required|integer",
       ]);

       Diagnoses::create($request->all());

       return Inertia::render('MedicRecords', [
        'records' => $data
    ]);
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
    public function update(Request $request)
    {
        Diagnoses::find($request->initialId)->update([
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
        return to_route('records');
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
