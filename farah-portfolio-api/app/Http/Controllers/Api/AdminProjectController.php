<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class AdminProjectController extends Controller
{
    public function index()
    {
        $projects = Project::with('images')
            ->orderBy('sort_order')
            ->latest()
            ->paginate(10);

        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'slug' => [
                'required',
                'string',
                'max:255',
                'unique:projects,slug',
            ],

            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'type' => [
                'required',
                'string',
                'max:255',
            ],

            'short_description' => [
                'required',
                'string',
            ],

            'description' => [
                'required',
                'string',
            ],

            'technologies' => [
                'required',
                'array',
            ],

            'technologies.*' => [
                'string',
                'max:100',
            ],

            'features' => [
                'required',
                'array',
            ],

            'features.*' => [
                'string',
                'max:500',
            ],

            'frontend' => [
                'nullable',
                'array',
            ],

            'backend' => [
                'nullable',
                'array',
            ],

            'database_tables' => [
                'nullable',
                'array',
            ],

            'github' => [
                'nullable',
                'url',
                'max:255',
            ],

            'live_demo' => [
                'nullable',
                'url',
                'max:255',
            ],

            'is_featured' => [
                'boolean',
            ],

            'sort_order' => [
                'integer',
                'min:0',
            ],
        ]);

        $project = Project::create($validated);

        return response()->json([
            'message' => 'Project created successfully.',
            'data' => $project,
        ], 201);
    }

    public function show(Project $project)
    {
        $project->load('images');

        return response()->json([
            'data' => $project,
        ]);
    }

    public function update(
        Request $request,
        Project $project
    ) {
        $validated = $request->validate([
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('projects', 'slug')
                    ->ignore($project->id),
            ],

            'title' => [
                'required',
                'string',
                'max:255',
            ],

            'type' => [
                'required',
                'string',
                'max:255',
            ],

            'short_description' => [
                'required',
                'string',
            ],

            'description' => [
                'required',
                'string',
            ],

            'technologies' => [
                'required',
                'array',
            ],

            'technologies.*' => [
                'string',
                'max:100',
            ],

            'features' => [
                'required',
                'array',
            ],

            'features.*' => [
                'string',
                'max:500',
            ],

            'frontend' => [
                'nullable',
                'array',
            ],

            'backend' => [
                'nullable',
                'array',
            ],

            'database_tables' => [
                'nullable',
                'array',
            ],

            'github' => [
                'nullable',
                'url',
                'max:255',
            ],

            'live_demo' => [
                'nullable',
                'url',
                'max:255',
            ],

            'is_featured' => [
                'boolean',
            ],

            'sort_order' => [
                'integer',
                'min:0',
            ],
        ]);

        $project->update($validated);

        return response()->json([
            'message' => 'Project updated successfully.',
            'data' => $project,
        ]);
    }

    public function destroy(Project $project)
{
    Storage::disk('public')->deleteDirectory(
        "projects/{$project->id}"
    );

    $project->delete();

    return response()->json([
        'message' => 'Project deleted successfully.',
    ]);
}
}
