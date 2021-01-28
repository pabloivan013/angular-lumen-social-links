<?php

namespace App\Services\Link;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\Link;
use App\Models\User;

class LinkService {

    /**
     * Delete and insert Links associated to a user id
     * 
     * @param Link $links
     * @param string $userId
     * @return void
     */
    public function deleteInsert($links, $userId) {
        DB::transaction(function () use ($links, $userId){
            Link::where('user_id', $userId)->delete();
            $now = Carbon::now('utc')->toDateTimeString();
            for ($i=0; $i < count($links); $i++) { 
                $links[$i]['user_id'] = $userId;
                $links[$i]['created_at'] = $now;
                $links[$i]['updated_at'] = $now;
                //Link::create($links[$i]); 
            }
            Link::insert($links);
        });
    }

   /**
    * Retrieves all the Links from a user
    * @param string $userId
    * @return Link
    */ 
    public function getLinks($userId) {
        $link = new link();
        return Link::where('user_id', $userId)->orderBy('position','ASC')->get($link->getFillable());
    }

}