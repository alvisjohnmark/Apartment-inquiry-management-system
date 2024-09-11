<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tenant; 
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class tenantController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required',
        ]);

        $tenant = Tenant::where('username', $request->username)->first();

        if ($tenant && Hash::check($request->password, $tenant->password)) {
            $token = $tenant->createToken('tenant-token', ['tenant'])->plainTextToken;
            return response()->json(['token' => $token], 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function dashboard()
    {
        $tenant = Auth::user(); 

        return response()->json([
            'message' => 'Welcome to the tenant dashboard',
        ], 200);
    }

    public function getTenantName()
    {
        $tenant = Auth::user();
        
        if ($tenant) {
            return response()->json(['name' => $tenant->first_name]);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}

