<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class adminController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $admin = Admin::where('email', $request->email)->first();

        if ($admin && Hash::check($request->password, $admin->password)) {
            $token = $admin->createToken('admin-token', ['admin'])->plainTextToken;
            return response()->json(['token' => $token], 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function dashboard()
    {
        $admin = Auth::user(); 

        return response()->json([
            'message' => 'Welcome to the admin dashboard',
        ], 200);
    }

    public function getAdminName()
    {
        $adminId = Auth::id(); 

        if ($adminId) {
            $admin = Admin::find($adminId);
            
            if ($admin) {
                return response()->json(['adminName' => $admin->name]);
            } else {
                return response()->json(['error' => 'Admin not found'], 404);
            }
        } else {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

}
}

