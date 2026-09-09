<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

#[Fillable([
    'original_name',
    'path',
    'size',
])]
class CvFile extends Model
{
    protected $appends = [
        'url',
    ];

    protected function casts(): array
    {
        return [
            'size' => 'integer',
        ];
    }

    public function getUrlAttribute(): string
    {
        return url(
            Storage::disk('public')->url($this->path)
        );
    }
}
