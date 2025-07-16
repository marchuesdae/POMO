<?php

use App\Models\User;
use App\Http\Controllers\UserResource;
use Illuminate\Support\Facades\Route;

// 🔽 Idugang ni
Route::get('/hello', function () {
    return ['message' => 'Hello from Laravel'];
});

use Illuminate\Support\Facades\Http;

Route::get('/spotify/admin-playlist', function () {
    $response = Http::asForm()->post('https://accounts.spotify.com/api/token', [
        'grant_type' => 'client_credentials',
        'client_id' => env('SPOTIFY_CLIENT_ID'),
        'client_secret' => env('SPOTIFY_CLIENT_SECRET'),
    ]);

    $accessToken = $response['access_token'];
    $playlistId = 'YOUR_SPOTIFY_PLAYLIST_ID';

    $playlist = Http::withToken($accessToken)->get("https://api.spotify.com/v1/playlists/{$playlistId}");

    return $playlist->json();
});
