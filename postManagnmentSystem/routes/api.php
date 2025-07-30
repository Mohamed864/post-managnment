<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\PostController;

// Authenticated Routes
Route::middleware('auth:sanctum')->group(function () {

    // User auth
    Route::prefix('users')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/', [AuthController::class, 'user']);
    });
    // Admin auth
    Route::prefix('admins')->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout']);
        Route::get('/', [AdminAuthController::class, 'admin']);
    });
    //post
    Route::apiResource('posts', PostController::class);

});

// User routes with prefix
Route::prefix('users')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Admin routes (already ok)
Route::prefix('admins')->group(function () {
    Route::post('/register', [AdminAuthController::class, 'register']);
    Route::post('/login', [AdminAuthController::class, 'login']);
});
