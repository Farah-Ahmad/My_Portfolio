<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CvFile;

class CvController extends Controller
{
    public function current()
    {
        $cv = CvFile::latest()->first();

        if (!$cv) {
            return response()->json([
                'message' => 'No CV uploaded yet.',
                'data' => null,
            ], 404);
        }

        return response()->json([
            'data' => $cv,
        ]);
    }
}
