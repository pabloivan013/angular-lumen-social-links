<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\Link\LinkService;

class LinkServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(LinkService::class, function() {
            return new LinkService();
        });
    }
}
