<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MovieController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum')->name('logout');

Route::apiResource('movies', MovieController::class)->only(['index', 'show']);
Route::post('movies/{movie}/rate', [MovieController::class, 'rate'])->name('movies.rate')->middleware('auth:sanctum');
