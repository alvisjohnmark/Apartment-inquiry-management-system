<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};


// use App\Models\Admin;

// Admin::create([
//     'name' => 'Ralph Jansen',
//     'email' => 'admin@gmail.com', 
//     'password' => bcrypt('password'), 
// ]);

// use \App\Models\Unit;
// Unit::create([
//     'capacity' => 4, 
//     'availability' => true, 
//     'rent_cost' => 1200, 
// ]);
