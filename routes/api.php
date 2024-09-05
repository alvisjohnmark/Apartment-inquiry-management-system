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
        Route::get('getTenants', [adminController::class, 'getTenants']); 
        Route::post('saveTenant', [adminController::class, 'saveTenant']); 
        Route::put('tenants/{id}', [adminController::class, 'updateTenant']); 
        Route::delete('tenants/{id}', [adminController::class, 'deleteTenant']); 
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
