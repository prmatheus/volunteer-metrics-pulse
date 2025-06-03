<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KanbanController;
use App\Http\Controllers\ProspeccaoController;

Route::get('/', function () {
    return view('welcome');
})->name('home');

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/kanban', [KanbanController::class, 'index'])->name('kanban');
Route::get('/prospeccao', [ProspeccaoController::class, 'index'])->name('prospeccao');
