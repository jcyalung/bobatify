import spotipy
import sys
import pprint
from env import set_vars
from spotipy.oauth2 import SpotifyOAuth, SpotifyClientCredentials
import json

set_vars()
scope = "user-library-read"

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))

client_credentials_manager = SpotifyClientCredentials()
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
sp.trace = True
user = sp.user(username)

playlists = sp.user_playlists(username)
for playlist in playlists['items']:
    for key, value in playlist.items():
        if key == 'name':
            print(value)
        playlist_id = playlist.get(key)

for item in results['tracks']['items']:
    track = item['track']
    print(track['name'] + ' - ' + track['artists'][0]['name'])