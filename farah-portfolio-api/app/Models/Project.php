<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'slug',
    'title',
    'type',
    'short_description',
    'description',
    'technologies',
    'features',
    'frontend',
    'backend',
    'database_tables',
    'github',
    'live_demo',
    'is_featured',
    'sort_order',
])]
class Project extends Model
{
    protected function casts(): array
    {
        return [
            'technologies' => 'array',
            'features' => 'array',
            'frontend' => 'array',
            'backend' => 'array',
            'database_tables' => 'array',
            'is_featured' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class)
            ->orderBy('sort_order')
            ->orderBy('id');
    }
}
