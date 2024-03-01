# Description: This file is used to scrape data from the Spotify API
# It uses the spotipy library to access the Spotify API
# It uses the set_vars function from env.py to set the environment variables
# It uses the SpotifyOAuth and SpotifyClientCredentials classes to authenticate the user
# It uses the json library to parse the data from the Spotify API
# It uses the pprint library to print the data in a readable format
import spotipy
import sys
import pprint
from env import set_vars
from spotipy.oauth2 import SpotifyOAuth, SpotifyClientCredentials
import json

# set environment variables
set_vars()

def get_current_user():
    # get current user
    scope = "user-library-read"
    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))
    user = sp.current_user()
    return user