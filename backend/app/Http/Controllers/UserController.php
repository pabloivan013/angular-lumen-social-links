<?php

namespace App\Http\Controllers;

use App\Services\User\UserService;
use App\Models\User;
use App\Services\Link\LinkService;
use Illuminate\Http\Request;

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
    public function createUpdateUser(Request $request) {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required',
            'sub' => 'required'
        ]);
        try {
            $user = $this->userService->updateOrCreateUser($request->all());
            return response()->json($user, 201);
        } catch (\Illuminate\Database\QueryException $e) {
            error_log("Error createUpdateUser: ".json_encode($e, JSON_PRETTY_PRINT));
            $errorCode = $e->errorInfo[1];
            $statusText = 'CreateUpdateUser error ';
            $userMessage = '';
            $statusCode = 500;
            if ($errorCode == 7) {
                // duplicate key value violates unique constraint
                $statusText .= 'Duplicate key value violates unique constraint';
                $userMessage .= 'Account name already exists';
                $statusCode = 409;
            }
            return response()->json(['message' => $userMessage, 'statusText' => $statusText], $statusCode);
        }
    }

    public function getUser(Request $request) {
        $this->validate($request, [
            'sub' => 'required'
        ]);
        $user = $this->userService->getUser('sub',$request['sub'], ['*']);
        return response()->json($user, 200);
    }

    public function getUserLinks(Request $request)
    {
        $this->validate($request, [
            'sub' => 'required'
        ]);
        $links = $this->userService->getUserLinks('sub', $request['sub']);
        return response()->json($links);
    }

    public function saveUserLinks(Request $request) {
        $this->validate($request, [
            'sub' => 'required'
        ]);
        $user = $this->userService->getUser('sub', $request['sub'], ['id']);
        $links = null;
        if (array_key_exists('socialLinks', $request->all())){
            $links = $this->linkService->deleteInsert($request['socialLinks'], $user['id']);
        }
        return response()->json($links, 201);
    }

    /** Public **/
    public function getUserLinksByName($accountname) {
        $links = $this->userService->getUserLinks('accountname', $accountname);
        return response()->json($links, 200);
    }

    public function getUserByName($accountname) {
        $user = $this->userService->getUser('accountname', $accountname, ['accountname','picture']);
        return response()->json($user, 200);
    }

}