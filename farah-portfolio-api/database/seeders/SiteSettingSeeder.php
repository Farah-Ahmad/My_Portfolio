<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

class SiteSettingSeeder extends Seeder
{
    public function run(): void
    {
        SiteSetting::firstOrCreate(
            ['id' => 1],
            [
                'full_name' =>
                    'Farah Ahmad',

                'professional_title' =>
                    'Full Stack Web Developer',

                'location' =>
                    'Beirut, Lebanon',

                'contact_email' =>
                    'farah.ahmad5789@gmail.com',

                'hero_label' =>
                    "Hello, I'm",

                'hero_description' =>
                    'I build scalable, responsive, and user-focused web applications using modern frontend and backend technologies. I enjoy creating complete solutions from intuitive interfaces to RESTful APIs and database architecture.',

                'about_heading' =>
                    'Building complete digital solutions, from frontend to backend.',

                'about_text_1' =>
                    "I'm a Computer Science graduate and Full Stack Web Developer passionate about building modern, scalable, and efficient software applications.",

                'about_text_2' =>
                    'I work across both frontend and backend development, creating responsive user interfaces, RESTful APIs, authentication systems, database-driven applications, and complete web solutions.',

                'about_text_3' =>
                    'My main technologies include Laravel, Spring Boot, React, Vue.js, MySQL, and MongoDB.',

                'github_url' =>
                    'https://github.com/Farah-Ahmad',

                'linkedin_url' =>
                    'https://www.linkedin.com/in/farah-ahmad-bb1ba426a',

                'seo_title' =>
                    'Farah Ahmad | Full Stack Web Developer',

                'seo_description' =>
                    'Full Stack Web Developer based in Beirut, Lebanon, building modern and scalable web applications.',

                'show_contact_form' =>
                    true,

                'show_cv_button' =>
                    true,
            ]
        );
    }
}
