<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DiagnosesController;
use App\Http\Controllers\AppointmentsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware(['isAlreadyLoggedIn']);

Route::get('/dashboard', [DiagnosesController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/records', [DiagnosesController::class, 'records'])->middleware(['auth', 'verified', 'isDoctorCheck'])->name('records');
Route::get('/request-appointment', [AppointmentsController::class, 'index'])->middleware(['auth', 'verified', 'isPatientCheck'])->name('req-app');
Route::get('/my-appointment', [AppointmentsController::class, 'myApp'])->middleware(['auth', 'verified', 'isPatientCheck'])->name('my-app');
Route::get('/appointment-list', [AppointmentsController::class, 'appList'])->middleware(['auth', 'verified', 'isDoctorCheck'])->name('app-list');
Route::post('/update-done', [AppointmentsController::class, 'appDone'])->middleware(['auth', 'verified', 'isDoctorCheck'])->name('app-done');
Route::post('/request-appointment', [AppointmentsController::class, 'store'])->middleware(['auth', 'verified', 'isPatientCheck'])->name('add-app');
Route::get('/store-records', [DiagnosesController::class, 'store'])->middleware(['auth', 'verified'])->name('store');
Route::get('/edit-records/{id}', [DiagnosesController::class, 'edit'])->middleware(['auth', 'verified'])->name('edit-records');
Route::post('/update', [DiagnosesController::class, 'update'])->middleware(['auth', 'verified'])->name('update-records');
Route::get('/delete/{id}', [DiagnosesController::class, 'destroy'])->middleware(['auth', 'verified'])->name('delete-records');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
