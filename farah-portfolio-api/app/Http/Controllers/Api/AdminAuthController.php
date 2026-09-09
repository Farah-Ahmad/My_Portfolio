<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login
    |--------------------------------------------------------------------------
    */

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
            ],

            'password' => [
                'required',
                'string',
                'max:255',
            ],
        ]);

        $email = strtolower(
            trim($validated['email'])
        );

        $user = User::where(
            'email',
            $email
        )->first();

        /*
         * Always return the same response when:
         *
         * - Email does not exist
         * - Password is incorrect
         * - User is not an admin
         *
         * This prevents account enumeration.
         */

        if (
            !$user ||
            !$user->is_admin ||
            !Hash::check(
                $validated['password'],
                $user->password
            )
        ) {
            return response()->json([
                'message' => 'Invalid credentials.',
            ], 401);
        }

        /*
         * Remove previous admin tokens.
         *
         * This keeps only the newest
         * admin login session active.
         */

        $user->tokens()->delete();

        /*
         * Create a fresh Sanctum token.
         */

        $token = $user
            ->createToken('admin-token')
            ->plainTextToken;

        return response()->json([
            'message' => 'Login successful.',

            'token' => $token,

            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ], 200);
    }


    /*
    |--------------------------------------------------------------------------
    | Current Admin
    |--------------------------------------------------------------------------
    */

    public function me(Request $request)
    {
        $user = $request->user();

        if (
            !$user ||
            !$user->is_admin
        ) {
            return response()->json([
                'message' => 'Unauthorized.',
            ], 403);
        }

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_admin' => true,
            ],
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | Logout
    |--------------------------------------------------------------------------
    */

    public function logout(Request $request)
    {
        $token =
            $request->user()
                ?->currentAccessToken();

        if ($token) {
            $token->delete();
        }

        return response()->json([
            'message' => 'Logged out successfully.',
        ]);
    }
}
