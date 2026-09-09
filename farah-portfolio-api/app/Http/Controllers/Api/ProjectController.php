<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;

class ProjectController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Public Projects List
    |--------------------------------------------------------------------------
    */

    public function index()
    {
        $projects = Project::where(
            'is_featured',
            true
        )
            ->with('images')
            ->orderBy('sort_order')
            ->latest()
            ->get();

        return response()->json([
            'data' => $projects,
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | Public Project Details
    |--------------------------------------------------------------------------
    |
    | Only visible / featured projects
    | are accessible from the public API.
    |
    */

    public function show(string $slug)
    {
        $project = Project::with('images')
            ->where('slug', $slug)
            ->where('is_featured', true)
            ->firstOrFail();

        return response()->json([
            'data' => $project,
        ]);
    }
}
