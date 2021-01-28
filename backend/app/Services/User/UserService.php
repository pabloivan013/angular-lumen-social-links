<?php

namespace App\Services\User;

use App\Models\User;
use App\Services\Link\LinkService;
use phpDocumentor\Reflection\Types\Null_;

class UserService
{

    /**
     * Retrieves a User model given by a column and his value or throw an exception if not found
     * 
     * @param  string $column
     * @param  string $val
     * @param  Array $columns
     * @param  bool  $visible
     * @return User|Exception
     */
    public function getUser($column, $val, $columns = ['*'], $visible = false)
    {
        $user = User::where($column, $val)->firstOrFail($columns);
        if ($visible)
            $user->makeVisible($columns)->toArray();
        return $user;
    }

    /** 
     * Update or create a User model
     * 
     * @param array $userData
     * @return User
    */
    public function updateOrCreateUser(array $userData)
    {
        return User::updateOrCreate(['sub' => $userData['sub']], $userData);
    }

    public function getUserLinks($column, $val)
    {
        $userLinks = $this->getUser($column, $val)->links;
        return $userLinks;
    }
}
