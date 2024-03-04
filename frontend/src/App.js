import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import BobaIcon from './boba.svg';
import SpotifyAccount from './SpotifyAccount';
import Playlist from './Playlist';

function App() {
  const [playlists, setPlaylists] = useState([]);
  const [account, setAccount] = useState({});
  const BASE_URL = 'http://localhost:8000/';
  const getUser = async () => {
    const response = await fetch(BASE_URL + 'current-user/');
    const data = await response.json();
    console.log(data);
    setAccount(data);
    return data;
  }
  const getUserPlaylists = async () => {
    const response = await fetch(BASE_URL + 'playlists/');
    const data = await response.json();
    setPlaylists(data["playlists"]);
    console.log(playlists.length > 0);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Boba Recommender!
        </p>
        {
        account ? 
          <SpotifyAccount account={account} />
          : null
        }
        <button id="login-button" className="big-btn" onClick={async () => {setAccount(await getUser());}}> Log in with Spotify <img src={BobaIcon} alt="boba"/> </button>
        <br></br>
        {
        account.display_name == null ? 
          null
         : <button id="get-button" className="playlist-btn" onClick={async () => {getUserPlaylists(); console.log('get playlists');}}>Get Playlists</button>
        }
        { playlists?.length > 0 ? 
          (<div className="playlist-container">
            <p>Here are your playlists:</p>
            {playlists.map((playlist) => {
              return(<Playlist playlist={playlist} />)
            })
          } 
          </div>)
          : <div>Not found</div> }
        
      </header>
    </div>
  );
}

export default App;
