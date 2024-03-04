import './App.css';
import './Playlist.css';
import React from 'react';
import { useEffect, useState } from 'react';
import BobaIcon from './boba.svg';
import SpotifyAccount from './SpotifyAccount';
//import Playlist from './Playlist';

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
            <button href={() => console.log('clicked')}>get recommendation!</button>
          </div>
      </div>)
}

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
  
  const bobaRecommendation = async (playlist) => { 
    console.log(playlist.name);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Boba Recommender!
        </h1>
        {
        account ? 
          <SpotifyAccount account={account} />
          : null
        }
        {account.display_name == null ? <button id="login-button" className="big-btn" onClick={async () => {setAccount(await getUser());}}> Log in with Spotify </button> : null}
        
        {account.display_name == null ?
          null
         : playlists.length === 0 ? 
              <button id="get-button" className="playlist-btn" onClick={async () => {getUserPlaylists(); console.log('get playlists');}}>Get Playlists <img src={BobaIcon} alt="boba"/> </button>
              : 
              null
        }
        { playlists?.length > 0 ? <div className="playlist-header">
          <h1>Here are your playlists:</h1>
          <p>Click on a playlist to get a boba drink recommendation!</p>
          </div> : null}
        { playlists?.length > 0 ? 
          (<div className="playlist-container">
              {playlists.map((movie) => (
                        <Playlist playlist={movie} onClick={async (playlist) => bobaRecommendation(playlist)}/>
                    ))}
          </div>)
          : <div></div>
          }
        
      </header>
    </div>
  );
}

export default App;
