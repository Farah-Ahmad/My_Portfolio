<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminProjectImageController extends Controller
{
    public function store(
        Request $request,
        Project $project
    ) {
        $validated = $request->validate([
            'images' => [
                'required',
                'array',
                'min:1',
                'max:10',
            ],

            'images.*' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
            ],
        ]);

        $createdImages = [];

        $currentOrder =
            (int) $project->images()->max('sort_order');

        foreach ($validated['images'] as $index => $image) {
            $path = $image->store(
                "projects/{$project->id}",
                'public'
            );

            $projectImage = $project->images()->create([
                'path' => $path,
                'sort_order' => $currentOrder + $index + 1,
            ]);

            $createdImages[] = $projectImage;
        }

        return response()->json([
            'message' => 'Images uploaded successfully.',
            'data' => $createdImages,
        ], 201);
    }

    public function destroy(
        Project $project,
        ProjectImage $image
    ) {
        if ($image->project_id !== $project->id) {
            abort(404);
        }

        Storage::disk('public')->delete(
            $image->path
        );

        $image->delete();

        return response()->json([
            'message' => 'Image deleted successfully.',
        ]);
    }
}
