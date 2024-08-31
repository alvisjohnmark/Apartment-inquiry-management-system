<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
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
        return response()->json([
            'success' => true,
            'announcements' => $announcements,
        ], 200);
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

}

