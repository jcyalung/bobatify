import './App.css';
import './Playlist.css';
import React from 'react';
import { useEffect, useState } from 'react';
import BobaIcon from './boba.svg';
import SpotifyAccount from './SpotifyAccount';
import Pearls from './pearls.svg';
//import Playlist from './Playlist';



function App() {
  const [playlists, setPlaylists] = useState([]);
  const [account, setAccount] = useState({});
  const BASE_URL = 'http://localhost:8000/';

  const getUser = async () => {
    const response = await fetch(BASE_URL + 'current-user', {redirect: 'follow'});
    const data = await response.json();
    console.log(data);
    setAccount(data);
    return data;
  }

  const getUserPlaylists = async () => {
    const response = await fetch(BASE_URL + 'playlists');
    const data = await response.json();
    setPlaylists(data["playlists"]);
  }

  const getPlaylistTracks = async (id) => {
    const response = await fetch(BASE_URL + 'playlist-tracks/' + id);
    const data = await response.json();
    console.log(data);
  }

  const Playlist = ({playlist}) => {
    return(
        <div className='playlist'>
            <div>
                <p>{playlist.name}</p>
            </div>
            <div>
                <img src={playlist.image} alt='playlist'/>
            </div>
            <div>
              <button onClick={() => getPlaylistTracks(playlist.id)}><img src={Pearls} alt='get recommendation!'></img></button>
            </div>
        </div>)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Boba Recommender!
        </h1>
        {/* display user's account */}
        {
        account ? 
          <SpotifyAccount account={account} />
          : null
        }
        {/* login button for spotify */}
        {account.display_name == null ? <button id="login-button" className="big-btn" onClick={async () => {setAccount(await getUser());}}> Log in with Spotify </button> : null}
        
        {/* get playlists button */}
        {account.display_name == null ?
          null
         : playlists.length === 0 ? 
              <button id="get-button" className="playlist-btn" onClick={async () => {getUserPlaylists(); console.log('get playlists');}}>Get Playlists <img src={BobaIcon} alt="boba"/> </button>
              : 
              null
        }
        {/* playlists header */}
        { playlists?.length > 0 ? <div className="playlist-header">
          <h2>Here are your playlists:</h2>
          <p>Click on the pearls to get a drink recommendation for the playlist!</p>
          </div> : null}
        {/* display playlists */}
        { playlists?.length > 0 ? 
          (<div className="playlist-container">
              {playlists.map((movie) => (
                        <Playlist playlist={movie} onClick={async (playlist) => getPlaylistTracks(playlist)}/>
                    ))}
          </div>)
          : <div></div>
        }
        <div className='recommendation'></div>
      </header>
    </div>
  );
}

export default App;
