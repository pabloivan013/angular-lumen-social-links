<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});


$router->group(['prefix' => 'api'], function () use ($router) {

    /** Auth0 endpoints**/
    $router->group(['prefix' => 'auth0'], function () use ($router) {
        $router->get('/users/links',  ['middleware' => 'auth', 'uses' => 'UserController@getUserLinks']);
  
        $router->post('/users/links', ['middleware' => 'auth', 'uses' => 'UserController@saveUserLinks']);

        $router->get('/users', ['middleware' => 'auth', 'uses' => 'UserController@getUser']);

        $router->post('/users', ['middleware' => 'auth', 'uses' => 'UserController@createUpdateUser']);
    });
    
    /** Public endpoints **/
    $router->get('users/{accountname}/links',  ['uses' => 'UserController@getUserLinksByName']);

    $router->get('users/{accountname}',  ['uses' => 'UserController@getUserByName']);
});
