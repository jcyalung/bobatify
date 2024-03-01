import requests

data = {
    'grant_type': 'client_credentials',
    'client_id': '877eb340cd264117a613e01137ca22ff',
    'client_secret': '0ac304c0ec574e1782385081f3ac2645',
}

response = requests.post('https://accounts.spotify.com/api/token', data=data)
print(response.json())
json_response = response.json()
headers = {
    'Authorization': f'Bearer {json_response["access_token"]}',
}

headers = {
    'Authorization': f'Bearer {json_response["access_token"]}',
}

response = requests.get('https://api.spotify.com/v1/playlists/44nqReGtGlvdQxUSGIWoEX/tracks', headers=headers)
for key, value in response.json().items():
    if key == 'items':
        for item in value:
            for item_key, item_value in item.items():
                if item_key == 'track':
                    for track_key, track_value in item_value.items():
                        if track_key == 'artists':
                            for artist in track_value:
                                for artist_key, artist_value in artist.items():
                                    if artist_key == 'name':
                                        print(artist_value, end=' ')
                        if track_key == 'name':
                            print(track_value, end=' - ')