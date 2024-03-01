import spotipy
from env import set_vars
from spotipy.oauth2 import SpotifyOAuth, SpotifyClientCredentials
import json
set_vars()
scope = "user-library-read"

# to get current user
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))
user = sp.current_user()

print(json.dumps(user, indent=4))

"""
set_vars()
scope = "user-library-read"
client_credentials_manager = SpotifyClientCredentials()
sp = spotipy.Spotify()
sp = spotipy.Spotify()
user = sp.current_user()
print(json.dumps(user, indent=4))
playlists = sp.user_playlists(username)
for playlist in playlists['items']:
    for key, value in playlist.items():
        if key == 'name':
            print(value)
        playlist_id = playlist.get(key)

for item in results['tracks']['items']:
    track = item['track']
    print(track['name'] + ' - ' + track['artists'][0]['name'])
"""