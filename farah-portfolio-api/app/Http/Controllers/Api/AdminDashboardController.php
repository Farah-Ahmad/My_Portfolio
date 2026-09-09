<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Project;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'projects' => Project::count(),

            'featured_projects' => Project::where(
                'is_featured',
                true
            )->count(),

            'messages' => ContactMessage::count(),

            'unread_messages' => ContactMessage::where(
                'is_read',
                false
            )->count(),

            'read_messages' => ContactMessage::where(
                'is_read',
                true
            )->count(),
        ];

        $recentMessages = ContactMessage::latest()
            ->take(5)
            ->get();

        $recentProjects = Project::orderBy('sort_order')
            ->latest()
            ->take(5)
            ->get();

        return response()->json([
            'stats' => $stats,

            'recent_messages' => $recentMessages,

            'recent_projects' => $recentProjects,
        ]);
    }
}
