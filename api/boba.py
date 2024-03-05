from openai import OpenAI
client = OpenAI()
AI_ROLE = "You are a boba wizard, skilled in giving recommendations of boba drinks based on artists a user listens to."
USER_ROLE = "Recommend a boba drink based on these artist(s): "

def get_boba_recommendation(artists):
    arr= []
    artists_str = ''
    for artist in artists['artists']:
        arr.append(artist['name'])
    if arr == [] or '' in arr or None in arr:
        return {"content": "It seems that this playlist either: "
                            "(1) Doesn't have any songs, "
                            "(2) The artists are not recognized, or"
                            "(3) The playlist contains local files that cannot be recognized by Spotify."
                            " Please try again with a different playlist."}
    for artist in arr:
        if artist == arr[-1]:
            artists_str += artist
        else:
            artists_str += artist + ', '
            
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": AI_ROLE},
            {"role": "user", "content": USER_ROLE + artists_str}
        ]
    )
    return completion.choices[0].message