<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'accountname', 'sub', 'nickname', 'picture'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['id', 'sub'];

    public function links()
    {
        return $this->hasMany(Link::class);
    }

    public function deleteLinks()
    {
        //$this->links()->delete();
        Link::where("user_id", $this->id)->delete();
        return $this;
    }

}