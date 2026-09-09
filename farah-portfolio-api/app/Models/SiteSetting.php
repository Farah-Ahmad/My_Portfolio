<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'full_name',
    'professional_title',
    'location',
    'contact_email',

    'hero_label',
    'hero_description',

    'about_heading',
    'about_text_1',
    'about_text_2',
    'about_text_3',

    'github_url',
    'linkedin_url',

    'seo_title',
    'seo_description',

    'show_contact_form',
    'show_cv_button',
])]
class SiteSetting extends Model
{
    protected function casts(): array
    {
        return [
            'show_contact_form' => 'boolean',
            'show_cv_button' => 'boolean',
        ];
    }
}
