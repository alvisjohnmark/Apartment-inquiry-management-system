<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\adminController;
use App\Http\Controllers\Auth\tenantController;

// Admin routes
Route::prefix('admin')->group(function () {
    Route::post('login', [adminController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('dashboard', [adminController::class, 'dashboard']);
        Route::get('name', [adminController::class, 'getAdminName']); 
        Route::post('saveAnnouncements', [adminController::class, 'saveAnnouncement']); 
        Route::get('getAnnouncements', [adminController::class, 'getAnnouncements']); 
        Route::delete('deleteAnnouncement/{id}', [adminController::class, 'deleteAnnouncement']);
        Route::put('updateAnnouncement/{id}', [adminController::class, 'updateAnnouncement']);

    });
});

// Tenant routes
Route::prefix('tenant')->group(function () {
    Route::post('login', [tenantController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('dashboard', [tenantController::class, 'dashboard']);
    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
