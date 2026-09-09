<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();

            /*
            |--------------------------------------------------------------------------
            | Personal Information
            |--------------------------------------------------------------------------
            */

            $table->string('full_name')
                ->default('Farah Ahmad');

            $table->string('professional_title')
                ->default('Full Stack Web Developer');

            $table->string('location')
                ->nullable();

            $table->string('contact_email')
                ->nullable();


            /*
            |--------------------------------------------------------------------------
            | Hero
            |--------------------------------------------------------------------------
            */

            $table->string('hero_label')
                ->default("Hello, I'm");

            $table->text('hero_description')
                ->nullable();


            /*
            |--------------------------------------------------------------------------
            | About
            |--------------------------------------------------------------------------
            */

            $table->string('about_heading')
                ->nullable();

            $table->text('about_text_1')
                ->nullable();

            $table->text('about_text_2')
                ->nullable();

            $table->text('about_text_3')
                ->nullable();


            /*
            |--------------------------------------------------------------------------
            | Social Links
            |--------------------------------------------------------------------------
            */

            $table->string('github_url')
                ->nullable();

            $table->string('linkedin_url')
                ->nullable();


            /*
            |--------------------------------------------------------------------------
            | SEO
            |--------------------------------------------------------------------------
            */

            $table->string('seo_title')
                ->nullable();

            $table->text('seo_description')
                ->nullable();


            /*
            |--------------------------------------------------------------------------
            | Website Options
            |--------------------------------------------------------------------------
            */

            $table->boolean('show_contact_form')
                ->default(true);

            $table->boolean('show_cv_button')
                ->default(true);


            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
