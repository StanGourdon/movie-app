<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MovieController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('register', [AuthController::class, 'register'])->name('register');
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum')->name('logout');

Route::middleware('auth:sanctum')->get('user', function (Request $request) {
    return $request->user();
});

Route::apiResource('movies', MovieController::class)->only(['index', 'show']);
Route::post('movies/{movie}/rate', [MovieController::class, 'rate'])->name('movies.rate')->middleware('auth:sanctum');
Route::post('movies/{movie}/like', [MovieController::class, 'toggleLike'])->name('movies.like')->middleware('auth:sanctum');
