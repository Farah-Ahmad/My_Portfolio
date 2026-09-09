<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;

class SettingController extends Controller
{
    public function show()
    {
        $settings = SiteSetting::first();

        if (!$settings) {
            return response()->json([
                'message' => 'Settings not found.',
            ], 404);
        }

        return response()->json([
            'data' => $settings,
        ]);
    }
}
