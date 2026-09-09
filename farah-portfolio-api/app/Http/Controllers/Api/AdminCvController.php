<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CvFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminCvController extends Controller
{
    public function show()
    {
        $cv = CvFile::latest()->first();

        return response()->json([
            'data' => $cv,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cv' => [
                'required',
                'file',
                'mimes:pdf',
                'max:10240',
            ],
        ]);

        $file = $validated['cv'];

        /*
        |--------------------------------------------------------------------------
        | Remove old CV files
        |--------------------------------------------------------------------------
        */

        $oldFiles = CvFile::all();

        foreach ($oldFiles as $oldCv) {
            Storage::disk('public')->delete(
                $oldCv->path
            );

            $oldCv->delete();
        }

        /*
        |--------------------------------------------------------------------------
        | Save New CV
        |--------------------------------------------------------------------------
        */

        $path = $file->store(
            'cv',
            'public'
        );

        $cv = CvFile::create([
            'original_name' =>
                $file->getClientOriginalName(),

            'path' => $path,

            'size' => $file->getSize(),
        ]);

        return response()->json([
            'message' =>
                'CV uploaded successfully.',

            'data' => $cv,
        ], 201);
    }

    public function destroy()
    {
        $cv = CvFile::latest()->first();

        if (!$cv) {
            return response()->json([
                'message' => 'No CV found.',
            ], 404);
        }

        Storage::disk('public')->delete(
            $cv->path
        );

        $cv->delete();

        return response()->json([
            'message' =>
                'CV deleted successfully.',
        ]);
    }
}
