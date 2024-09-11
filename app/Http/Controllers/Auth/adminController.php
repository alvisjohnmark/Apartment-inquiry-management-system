<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\Unit;
use App\Models\Tenant;
use App\Models\Announcement;
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

    public function saveAnnouncement(Request $request)
    {
        $announcement = new Announcement();
        $announcement->title = $request->input('title');
        $announcement->content = $request->input('content');
        $announcement->save();

        return response()->json([
            'success' => true,
            'message' => 'Announcement added successfully.',
        ], 201);
    }
    public function getAnnouncements()
    {
        $announcements = Announcement::all();
        return $announcements;
    }

    public function deleteAnnouncement($id)
    {
        $announcement = Announcement::find($id);
        if ($announcement) {
            $announcement->delete();
            return response()->json(['message' => 'Announcement deleted successfully.']);
        } else {
            return response()->json(['message' => 'Announcement not found.'], 404);
        }
    }

    public function updateAnnouncement(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);
        $announcement = Announcement::find($id);
        if (!$announcement) {
            return response()->json(['message' => 'Announcement not found'], 404);
        }
        $announcement->update($validatedData);
        return response()->json(['message' => 'Announcement updated successfully']);
    }

    public function getTenants()
    {
        $tenants = Tenant::all();
        return $tenants;
    }

    public function saveTenant(Request $request)
    {

        $tenant = new Tenant();
        $tenant->unit_id = $request->input('unit_id');
        $tenant->first_name = $request->input('first_name');
        $tenant->middle_name = $request->input('middle_name');
        $tenant->last_name = $request->input('last_name');
        $tenant->phone_number = $request->input('phone_number');
        $tenant->email = $request->input('email');
        $tenant->address = $request->input('address');
        $tenant->username = $request->input('username');
        $tenant->isRepresentative = $request->input('isRepresentative');
        $tenant->password = bcrypt($request->input('password'));
        $tenant->save();
    
        return response()->json([
            'success' => true,
            'message' => 'Tenant added successfully.',
        ], 201);
    }
    

    public function updateTenant(Request $request, $id)
    {
        $tenant = Tenant::findOrFail($id);
    
        $updateData = $request->all();
    
        if ($request->filled('password')) {
            $updateData['password'] = bcrypt($request->password);
        }
    
        $tenant->update($updateData);
    
        return response()->json($tenant, 200);
    }
    
    
    public function deleteTenant($id)
    {
        $tenant = Tenant::find($id);
        if ($tenant) {
            $tenant->delete();
            return response()->json(['message' => 'Tenant deleted successfully.']);
        } else {
            return response()->json(['message' => 'Tenant not found.'], 404);
        }
    }

    public function getUnits()
    {
        $units = Unit::with(['tenants' => function($query) {
            $query->where('isRepresentative', 1); 
        }])->get();
        
        foreach ($units as $unit) {
            if ($unit->tenants->isEmpty()) {
                $unit->representative = null;
            } else {

                $unit->representative = $unit->tenants->first();
            }
        }
        
        return $units;
    }
    public function updateUnit(Request $request, $id)
    {
        $updateData = $request->all();
        $unit = Unit::find($id);
        if (!$unit) {
            return response()->json(['message' => 'Unit not found'], 404);
        }
        $unit->update($updateData);
        return response()->json(['message' => 'Unit updated successfully']);
    }
}
    



