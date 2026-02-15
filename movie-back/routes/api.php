<?php

use App\Http\Controllers\Api\MovieController;
use Illuminate\Support\Facades\Route;

Route::apiResource('movies', MovieController::class)->only(['index', 'show']);
Route::post('movies/{movie}/rate', [MovieController::class, 'rate'])->name('movies.rate')->middleware('auth:sanctum');
