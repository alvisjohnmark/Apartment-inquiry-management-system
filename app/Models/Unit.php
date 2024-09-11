<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    use HasFactory, HasApiTokens;
    

    protected $fillable = ['capacity', 'availability', 'rent_cost'];

    public function tenants()
    {
        return $this->hasMany(Tenant::class);
    }
}
