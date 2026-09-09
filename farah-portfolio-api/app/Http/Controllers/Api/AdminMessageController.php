<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ContactReplyMail;
use App\Models\ContactMessage;
use App\Models\ContactMessageReply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class AdminMessageController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | List Messages
    |--------------------------------------------------------------------------
    */

    public function index(Request $request)
    {
        $query = ContactMessage::query()
            ->withCount('replies')
            ->withMax(
                'replies as last_replied_at',
                'sent_at'
            );


        /*
        |--------------------------------------------------------------------------
        | Search
        |--------------------------------------------------------------------------
        */

        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where(
                    'name',
                    'like',
                    "%{$search}%"
                )
                    ->orWhere(
                        'email',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
                        'subject',
                        'like',
                        "%{$search}%"
                    )
                    ->orWhere(
                        'message',
                        'like',
                        "%{$search}%"
                    );
            });
        }


        /*
        |--------------------------------------------------------------------------
        | Filter
        |--------------------------------------------------------------------------
        */

        if ($request->status === 'read') {
            $query->where(
                'is_read',
                true
            );
        }

        if ($request->status === 'unread') {
            $query->where(
                'is_read',
                false
            );
        }


        /*
        |--------------------------------------------------------------------------
        | Pagination
        |--------------------------------------------------------------------------
        */

        $messages = $query
            ->latest()
            ->paginate(10);


        /*
        |--------------------------------------------------------------------------
        | Statistics
        |--------------------------------------------------------------------------
        */

        $totalMessages =
            ContactMessage::count();

        $unreadMessages =
            ContactMessage::where(
                'is_read',
                false
            )->count();

        $readMessages =
            ContactMessage::where(
                'is_read',
                true
            )->count();


        return response()->json([
            'messages' => $messages,

            'stats' => [
                'total' => $totalMessages,
                'unread' => $unreadMessages,
                'read' => $readMessages,
            ],
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | Show Message
    |--------------------------------------------------------------------------
    */

    public function show(
        ContactMessage $contactMessage
    ) {
        if (
            !$contactMessage->is_read
        ) {
            $contactMessage->update([
                'is_read' => true,
            ]);
        }


        /*
         * Load reply history.
         *
         * Latest reply appears first.
         */

        $contactMessage->load([
            'replies' => function ($query) {
                $query->latest('sent_at');
            },
        ]);


        return response()->json([
            'data' => $contactMessage,
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | Mark Read
    |--------------------------------------------------------------------------
    */

    public function markRead(
        ContactMessage $contactMessage
    ) {
        $contactMessage->update([
            'is_read' => true,
        ]);

        return response()->json([
            'message' =>
                'Message marked as read.',

            'data' =>
                $contactMessage,
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | Mark Unread
    |--------------------------------------------------------------------------
    */

    public function markUnread(
        ContactMessage $contactMessage
    ) {
        $contactMessage->update([
            'is_read' => false,
        ]);

        return response()->json([
            'message' =>
                'Message marked as unread.',

            'data' =>
                $contactMessage,
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | Delete Message
    |--------------------------------------------------------------------------
    */

    public function destroy(
        ContactMessage $contactMessage
    ) {
        /*
         * Reply history is deleted
         * automatically because the
         * foreign key uses cascadeOnDelete().
         */

        $contactMessage->delete();

        return response()->json([
            'message' =>
                'Message deleted successfully.',
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | Reply By Email
    |--------------------------------------------------------------------------
    */

    public function reply(
        Request $request,
        ContactMessage $contactMessage
    ) {
        $validated =
            $request->validate([
                'subject' => [
                    'required',
                    'string',
                    'max:200',
                ],

                'message' => [
                    'required',
                    'string',
                    'min:2',
                    'max:5000',
                ],
            ]);


        /*
        |--------------------------------------------------------------------------
        | Send Email
        |--------------------------------------------------------------------------
        |
        | We send the email first.
        |
        | If Gmail / SMTP fails, Laravel throws
        | an exception and the reply will NOT be
        | stored as successfully sent.
        |
        */

        Mail::to(
            $contactMessage->email
        )->send(
            new ContactReplyMail(
                $validated['subject'],
                $validated['message']
            )
        );


        /*
        |--------------------------------------------------------------------------
        | Save Reply History
        |--------------------------------------------------------------------------
        */

        $reply =
            ContactMessageReply::create([
                'contact_message_id' =>
                    $contactMessage->id,

                'subject' =>
                    $validated['subject'],

                'message' =>
                    $validated['message'],

                'sent_at' =>
                    now(),
            ]);


        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'message' =>
                'Reply sent successfully.',

            'data' =>
                $reply,
        ], 201);
    }
}
