<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ContactMessage extends Model
{
    protected $fillable = [
        'name',
        'email',
        'subject',
        'message',
        'is_read',
    ];

    /*
    |--------------------------------------------------------------------------
    | Casts
    |--------------------------------------------------------------------------
    */

    protected function casts(): array
    {
        return [
            'is_read' => 'boolean',
        ];
    }


    /*
    |--------------------------------------------------------------------------
    | Replies
    |--------------------------------------------------------------------------
    */

    public function replies(): HasMany
    {
        return $this->hasMany(
            ContactMessageReply::class
        );
    }
}
