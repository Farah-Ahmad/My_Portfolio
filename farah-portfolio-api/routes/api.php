<?php

use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\AdminMessageController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\AdminProjectController;
use App\Http\Controllers\Api\AdminProjectImageController;
use App\Http\Controllers\Api\AdminDashboardController;
use App\Http\Controllers\Api\CvController;
use App\Http\Controllers\Api\AdminCvController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\AdminSettingController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Contact
|--------------------------------------------------------------------------
|
| Limited to 5 requests per minute per IP.
|
*/

Route::post('/contact', [
    ContactController::class,
    'store',
])->middleware('throttle:contact');


/*
|--------------------------------------------------------------------------
| Admin Login
|--------------------------------------------------------------------------
|
| Limited to 5 login attempts per minute.
|
*/

Route::post('/admin/login', [
    AdminAuthController::class,
    'login',
])->middleware('throttle:admin-login');


/*
|--------------------------------------------------------------------------
| Public Projects
|--------------------------------------------------------------------------
*/

Route::get('/projects', [
    ProjectController::class,
    'index',
]);

Route::get('/projects/{slug}', [
    ProjectController::class,
    'show',
]);


/*
|--------------------------------------------------------------------------
| Public CV
|--------------------------------------------------------------------------
*/

Route::get('/cv/current', [
    CvController::class,
    'current',
]);


/*
|--------------------------------------------------------------------------
| Public Settings
|--------------------------------------------------------------------------
|
| Used by the public portfolio to load
| personal information, hero content,
| about content, social links and options.
|
*/

Route::get('/settings', [
    SettingController::class,
    'show',
]);


/*
|--------------------------------------------------------------------------
| Protected Admin Routes
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth:sanctum',
    'admin',
])
    ->prefix('admin')
    ->group(function () {

        /*
        |--------------------------------------------------------------------------
        | Dashboard
        |--------------------------------------------------------------------------
        */

        Route::get('/dashboard', [
            AdminDashboardController::class,
            'index',
        ]);

        Route::post('/messages/{contactMessage}/reply', [
            AdminMessageController::class,
            'reply',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Authentication
        |--------------------------------------------------------------------------
        */

        Route::get('/me', [
            AdminAuthController::class,
            'me',
        ]);

        Route::post('/logout', [
            AdminAuthController::class,
            'logout',
        ]);


        /*
        |--------------------------------------------------------------------------
        | Contact Messages
        |--------------------------------------------------------------------------
        */

        Route::get('/messages', [
            AdminMessageController::class,
            'index',
        ]);

        Route::get('/messages/{contactMessage}', [
            AdminMessageController::class,
            'show',
        ]);

        Route::patch('/messages/{contactMessage}/read', [
            AdminMessageController::class,
            'markRead',
        ]);

        Route::patch('/messages/{contactMessage}/unread', [
            AdminMessageController::class,
            'markUnread',
        ]);

        Route::delete('/messages/{contactMessage}', [
            AdminMessageController::class,
            'destroy',
        ]);


        /*
        |--------------------------------------------------------------------------
        | Projects
        |--------------------------------------------------------------------------
        */

        Route::get('/projects', [
            AdminProjectController::class,
            'index',
        ]);

        Route::post('/projects', [
            AdminProjectController::class,
            'store',
        ]);

        Route::get('/projects/{project}', [
            AdminProjectController::class,
            'show',
        ]);

        Route::put('/projects/{project}', [
            AdminProjectController::class,
            'update',
        ]);

        Route::delete('/projects/{project}', [
            AdminProjectController::class,
            'destroy',
        ]);


        /*
        |--------------------------------------------------------------------------
        | Project Images
        |--------------------------------------------------------------------------
        */

        Route::post('/projects/{project}/images', [
            AdminProjectImageController::class,
            'store',
        ]);

        Route::delete('/projects/{project}/images/{image}', [
            AdminProjectImageController::class,
            'destroy',
        ]);


        /*
        |--------------------------------------------------------------------------
        | CV Management
        |--------------------------------------------------------------------------
        */

        Route::get('/cv', [
            AdminCvController::class,
            'show',
        ]);

        Route::post('/cv', [
            AdminCvController::class,
            'store',
        ]);

        Route::delete('/cv', [
            AdminCvController::class,
            'destroy',
        ]);


        /*
        |--------------------------------------------------------------------------
        | Website Settings
        |--------------------------------------------------------------------------
        */

        Route::get('/settings', [
            AdminSettingController::class,
            'show',
        ]);

        Route::put('/settings', [
            AdminSettingController::class,
            'update',
        ]);
    });
