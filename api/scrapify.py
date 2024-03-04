# Description: This file is used to scrape data from the Spotify API
# It uses the spotipy library to access the Spotify API
# It uses the set_vars function from env.py to set the environment variables
# It uses the SpotifyOAuth and SpotifyClientCredentials classes to authenticate the user
# It uses the json library to parse the data from the Spotify API
# It uses the pprint library to print the data in a readable format
import spotipy
from env import set_vars
from spotipy.oauth2 import SpotifyOAuth, SpotifyClientCredentials

# set environment variables
set_vars()

def get_current_user():
    # get current user
    scope = "user-library-read"
    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))
    user = sp.current_user()
    return user

def get_user_playlists():
    # get user playlists
    scope = "playlist-read-private"
    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))
    playlists = sp.current_user_playlists()
    return playlists

def get_playlist_tracks(playlist_id):
    # get playlist tracks
    scope = "user-library-read"
    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))
    tracks = sp.playlist_tracks(playlist_id)
    return tracks

def get_artist_averages(playlist_id):
    tracks = get_playlist_tracks(playlist_id)
    artists = {}
    for track in tracks['items']:
        for artist in track['track']['artists']:
            if artist['name'] in artists:
                artists[artist['name']] += 1
            else:
                artists[artist['name']] = 1
    for key, value in artists.items():
        percentage = (value / len(tracks['items'])) * 100
        artists[key] = f'{percentage:.2f}%'
    return {'artists':artists}