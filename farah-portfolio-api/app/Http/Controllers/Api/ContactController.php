<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | Honeypot Check
        |--------------------------------------------------------------------------
        |
        | Real users should never fill this field.
        | If it contains a value, reject the request.
        |
        */

        if ($request->filled('company_fax')) {
            return response()->json([
                'message' => 'Invalid submission.',
            ], 422);
        }


        /*
        |--------------------------------------------------------------------------
        | Validation
        |--------------------------------------------------------------------------
        */

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'min:2',
                'max:100',
            ],

            'email' => [
                'required',
                'email:rfc,dns',
                'max:255',
            ],

            'subject' => [
                'nullable',
                'string',
                'max:150',
            ],

            'message' => [
                'required',
                'string',
                'min:10',
                'max:3000',
            ],
        ]);


        /*
        |--------------------------------------------------------------------------
        | Save Message
        |--------------------------------------------------------------------------
        */

        $contactMessage = ContactMessage::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'subject' => $validated['subject'] ?? null,
            'message' => $validated['message'],
        ]);


        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'message' => 'Your message has been sent successfully.',
            'data' => $contactMessage,
        ], 201);
    }
}
