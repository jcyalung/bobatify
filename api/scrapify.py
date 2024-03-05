# Description: This file is used to scrape data from the Spotify API
# It uses the spotipy library to access the Spotify API
# It uses the set_vars function from env.py to set the environment variables
# It uses the SpotifyOAuth and SpotifyClientCredentials classes to authenticate the user
# It uses the json library to parse the data from the Spotify API
# It uses the pprint library to print the data in a readable format
import spotipy
from spotipy.util import prompt_for_user_token
from env import set_vars
from spotipy.oauth2 import SpotifyOAuth, SpotifyClientCredentials

# set environment variables
set_vars()
scope = "user-library-read " 
scope += "playlist-read-private "

# get current user
def get_current_user():
    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))
    user = sp.current_user()
    return user

# get user playlists
def get_user_playlists():
    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))
    playlists = sp.current_user_playlists()
    return playlists

# get playlist tracks
def get_playlist_tracks(playlist_id):
    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))
    tracks = sp.playlist_tracks(playlist_id)
    list_tracks = []
    for track in tracks['items']:
        list_tracks.append({'name':track['track']['name'], 'artist(s)':[artist['name'] for artist in track['track']['artists']]})
    return list_tracks

# get artists in playlist
def get_artists(playlist_id):
    tracks = get_playlist_tracks(playlist_id)
    artists = {}
    for track in tracks['items']:
        for artist in track['track']['artists']:
            if artist['name'] in artists:
                artists[artist['name']] += 1
            else:
                artists[artist['name']] = 1
    return {'artists':list(artists.keys())}