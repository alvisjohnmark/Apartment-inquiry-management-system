<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class Tenant extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'first_name', 'middle_name', 'last_name',
        'username', 'phone_number', 'address',
        'isRepresentative', 'email', 'password', 'unit_id'
    ];

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }
    protected $hidden = [
        'password', 'remember_token',
    ];
}
