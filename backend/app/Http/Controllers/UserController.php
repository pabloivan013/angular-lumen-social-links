<?php

namespace App\Http\Controllers;

use App\Services\User\UserService;
use App\Models\User;
use App\Services\Link\LinkService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator as Validator;

class UserController extends Controller
{

    protected $userService;
    protected $linkService;

    public function __construct(UserService $userService, LinkService $linkService)
    {
        $this->userService = $userService;
        $this->linkService = $linkService;
    }

    /** Auth0 **/
    public function createUpdateUser(Request $request) 
    {
        if ($request['accountname']) {
            $request['accountname'] = strtolower($request['accountname']);
        }
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required',
            'sub' => 'required',
            'accountname'=>'required|alpha_num|between:5,15|unique:users'
        ]);
        $user = $this->userService->updateOrCreateUser($request->all());
        return response()->json($user, 201);
    }

    public function getUser(Request $request) 
    {
        $this->validate($request, [
            'sub' => 'required|exists:users'
        ],[
            'sub.exists' => 'User not found in db.'
        ]);
        $user = $this->userService->getUser('sub',$request['sub'], ['*']);
        return response()->json($user, 200);
    }

    public function getUserLinks(Request $request)
    {
        $this->validate($request, [
            'sub' => 'required|exists:users'
        ],[
            'sub.exists' => 'User not found in db.'
        ]);
        $links = $this->userService->getUserLinks('sub', $request['sub']);
        return response()->json($links);
    }

    public function saveUserLinks(Request $request) 
    {
        $rules = [
            'sub' => 'required|exists:users',
            'socialLinks' => 'present|array'
        ];
        $messages = [
            'sub.exists' => 'Update your account name before save.'
        ];
        $this->validate($request, $rules, $messages);

        $user = $this->userService->getUser('sub', $request['sub'], ['id']);
        $links = $this->linkService->deleteInsert($request['socialLinks'], $user['id']);
        return response()->json($links, 201);
    }

    /** Public **/
    public function getUserLinksByName($accountname) 
    {
        $accountname = strtolower($accountname);
        $links = $this->userService->getUserLinks('accountname', $accountname);
        return response()->json($links, 200);
    }

    public function getUserByName($accountname) 
    {     
        $accountname = strtolower($accountname);
        $user = $this->userService->getUser('accountname', $accountname, ['accountname','picture']);
        return response()->json($user, 200);
    }

}