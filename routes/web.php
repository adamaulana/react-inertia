<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/login', function () {return Inertia::render('Login');})->name('login');
Route::get('/register', function () {return Inertia::render('Register');})->name('register');



Route::middleware('auth')->group(function () {
    Route::get('/', function () {return Inertia::render('test');})->name('test');
    Route::get('/profile', function () {return Inertia::render('profile');})->name('profile');
    // Route::get('/user/create', function () {return Inertia::render('CreateUser');})->name('user.create');
    Route::get('/user/create', [UserController::class,'create'])->name('user.create');
    Route::post('/user/post', [UserController::class,'store'])->name('user.post');
    Route::put('/user/update', [UserController::class,'update'])->name('user.update');
    Route::resource('/user', UserController::class);
});

