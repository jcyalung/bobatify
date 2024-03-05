from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import scrapify
import json
app = FastAPI()
user = ''
user_id = ''
display_name = ''

# This middleware is required in order to accept requests from other domains such as a React app running on 'localhost:3000'
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return({ "message": "hello world" })

@app.get("/current-user")
def current_user():
    user = scrapify.get_current_user()
    return user

@app.get("/playlists")
def user_playlists():
    playlists = scrapify.get_user_playlists()
    items = []
    for playlist in playlists['items']:
        items.append({'name':playlist['name'], 'id':playlist['id'], "image":playlist['images'][0]['url']})
    return {'playlists':items}

@app.get("/playlist-tracks/{playlist_id}")
def playlist_tracks(playlist_id):
    tracks = scrapify.get_playlist_tracks(playlist_id)
    return {'tracks':tracks}

@app.get("/artists/{playlist_id}")
def artists(playlist_id):
    artists = scrapify.get_artists(playlist_id)
    return artists
    

if __name__ == "__main__":
    uvicorn.run("server:app", port=8000, reload=True)