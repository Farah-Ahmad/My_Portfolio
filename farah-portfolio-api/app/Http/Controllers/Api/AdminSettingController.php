<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;

class AdminSettingController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Show Settings
    |--------------------------------------------------------------------------
    */

    public function show()
    {
        $settings = SiteSetting::firstOrCreate([
            'id' => 1,
        ]);

        return response()->json([
            'data' => $settings,
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | Update Settings
    |--------------------------------------------------------------------------
    */

    public function update(Request $request)
    {
        $validated = $request->validate([
            /*
            |--------------------------------------------------------------------------
            | Personal Information
            |--------------------------------------------------------------------------
            */

            'full_name' => [
                'required',
                'string',
                'max:100',
            ],

            'professional_title' => [
                'required',
                'string',
                'max:150',
            ],

            'location' => [
                'nullable',
                'string',
                'max:150',
            ],

            'contact_email' => [
                'nullable',
                'email:rfc',
                'max:255',
            ],


            /*
            |--------------------------------------------------------------------------
            | Hero
            |--------------------------------------------------------------------------
            */

            'hero_label' => [
                'nullable',
                'string',
                'max:100',
            ],

            'hero_description' => [
                'nullable',
                'string',
                'max:1500',
            ],


            /*
            |--------------------------------------------------------------------------
            | About
            |--------------------------------------------------------------------------
            */

            'about_heading' => [
                'nullable',
                'string',
                'max:255',
            ],

            'about_text_1' => [
                'nullable',
                'string',
                'max:2000',
            ],

            'about_text_2' => [
                'nullable',
                'string',
                'max:2000',
            ],

            'about_text_3' => [
                'nullable',
                'string',
                'max:2000',
            ],


            /*
            |--------------------------------------------------------------------------
            | Social Links
            |--------------------------------------------------------------------------
            */

            'github_url' => [
                'nullable',
                'url',
                'max:255',
            ],

            'linkedin_url' => [
                'nullable',
                'url',
                'max:255',
            ],


            /*
            |--------------------------------------------------------------------------
            | SEO
            |--------------------------------------------------------------------------
            */

            'seo_title' => [
                'nullable',
                'string',
                'max:255',
            ],

            'seo_description' => [
                'nullable',
                'string',
                'max:500',
            ],


            /*
            |--------------------------------------------------------------------------
            | Options
            |--------------------------------------------------------------------------
            */

            'show_contact_form' => [
                'required',
                'boolean',
            ],

            'show_cv_button' => [
                'required',
                'boolean',
            ],
        ]);


        $settings = SiteSetting::updateOrCreate(
            [
                'id' => 1,
            ],
            $validated
        );


        return response()->json([
            'message' => 'Settings updated successfully.',
            'data' => $settings,
        ]);
    }
}
