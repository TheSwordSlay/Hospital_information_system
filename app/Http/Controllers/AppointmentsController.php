<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Appointments;
use App\Http\Requests\StoreAppointmentsRequest;
use App\Http\Requests\UpdateAppointmentsRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

class AppointmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('AddAppointment');
    }

    public function myApp() {
        $app = Appointments::where('patientId', Auth::user()->id)->where('isDone', false)->get();
        return Inertia::render('MyAppointment', [
            'app' => $app
        ]);
    }

    public function appList() {
        $app = Appointments::where('isDone', false)->get();
        return Inertia::render('AppointmentLists', [
            'app' => $app
        ]);
    }

    public function appDone(UpdateAppointmentsRequest $request) {
        $app = Appointments::where('id', $request->idUpdate)->update(['isDone' => true]);
        return to_route('app-list')->with('message', 'Appointment selesai');
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
    public function store(StoreAppointmentsRequest $request)
    {
        $data = Appointments::where('isDone', false)->get()->toArray();
        $canAppoint = true;
        $skipCheck = false;
        $request->validate([
            'date' => "required",
            'hours' => "required",
        ]);
        $now = Carbon::now();
        $date = Carbon::createFromTimeString($request->date.' '.$request->hours);
        $twentyFourHourLater = Carbon::now()->addHours(24);
        if($now->gt($date)) {
            $skipCheck = true;
            $canAppoint = false;
        } 
        // else if ($date->between($now, $twentyFourHourLater, true)) {
        //     $skipCheck = true;
        //     $canAppoint = false;
        // }
        if(!$skipCheck) {
            foreach($data as $app) {
                if ($request->date == $app['date'])  {
                    $hour = Carbon::createFromTimeString($request->hours);
                    $hourCheck = Carbon::createFromTimeString($app['hours'])->subMinutes(119);
                    $hourCheck2 = Carbon::createFromTimeString($app['hours'])->addHours(2);
                    if($hour->between($hourCheck, $hourCheck2,true)) {
                        $canAppoint = false;
                    }
                }
            }
        }

        if($canAppoint) {
            Appointments::create($request->all());
            return to_route('req-app')->with('message', '1');
        } else {
            return to_route('req-app')->with('message', '0');
        }
    }

    

    /**
     * Display the specified resource.
     */
    public function show(Appointments $appointments)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Appointments $appointments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAppointmentsRequest $request, Appointments $appointments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appointments $appointments)
    {
        //
    }
}
