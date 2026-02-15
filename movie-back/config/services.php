<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'tmdb' => [
        'bearer_token' => env('TMDB_BEARER_TOKEN'),
        'base_url' => 'https://api.themoviedb.org/3',
        'poster_path' => env('TMDB_POSTER_PATH', 'https://image.tmdb.org/t/p/'),
        'poster_size' => env('TMDB_POSTER_SIZE', 'w500'),
        'verify_ssl' => filter_var(env('TMDB_VERIFY_SSL', true), FILTER_VALIDATE_BOOLEAN),
    ],

];
