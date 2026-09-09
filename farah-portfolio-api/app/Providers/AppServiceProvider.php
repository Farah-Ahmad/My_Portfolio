<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Contact Form Rate Limiter
        |--------------------------------------------------------------------------
        |
        | Maximum 5 contact submissions per minute
        | from the same IP address.
        |
        */

        RateLimiter::for('contact', function (Request $request) {
            return Limit::perMinute(5)
                ->by($request->ip());
        });


        /*
        |--------------------------------------------------------------------------
        | Admin Login Rate Limiter
        |--------------------------------------------------------------------------
        |
        | Maximum 5 login attempts per minute
        | for the same email + IP combination.
        |
        */

        RateLimiter::for('admin-login', function (Request $request) {
            $email = strtolower(
                (string) $request->input('email')
            );

            return Limit::perMinute(5)
                ->by(
                    $email . '|' . $request->ip()
                );
        });
    }
}
