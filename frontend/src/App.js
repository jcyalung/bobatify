import './styles/App.css';
import './styles/Playlist.css';
import './styles/Tracklist.css';
import './styles/ArtistList.css';
import './styles/Recommendation.css';
import React from 'react';
import { useState } from 'react';
import BobaIcon from './boba.svg';
import SpotifyAccount from './SpotifyAccount';
import Pearls from './pearls.svg';
import Tracklist from './Tracklist';
import ArtistList from './ArtlistList';
//import Playlist from './Playlist';



function App() {
  const [playlists, setPlaylists] = useState([]);
  const [account, setAccount] = useState({});
  const [playlist, setPlaylist] = useState({});
  const [playlistName, setPlaylistName] = useState('');
  const [artists, setArtists] = useState([]);
  const [recommendation, setRecommendation] = useState({});

  const BASE_URL = 'http://localhost:8000/';
  const PLAYLIST_URL = 'https://open.spotify.com/playlist/';
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

  const getArtists = async (id) => {
    const response = await fetch(BASE_URL + 'artists/' + id);
    const data = await response.json();
    setArtists(data["artists"]);
  }

  const getPlaylist = async (id, name) => {
    const response = await fetch(BASE_URL + 'playlist-tracks/' + id);
    const data = await response.json();
    setPlaylist(data);
    setPlaylistName(name);
    getArtists(id);
  }
  
  const getRecommendation = async (id) => {
    const response = await fetch(BASE_URL + 'recommendation/' + id);
    const data = await response.json();
    setRecommendation(data);
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
              <button onClick={() => {getPlaylist(playlist.id, playlist.name); getRecommendation(playlist.id); }}><img src={Pearls} alt='get recommendation!'></img></button>
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
                        <Playlist playlist={movie}/>
                    ))}
          </div>)
          : <div></div>
        }
        {/* recommendations go here */}
        {
          playlist.tracks ?
          <div className='recommendation'>
            <div className='recommendation-header'>
              <h3>From your playlist<a href={PLAYLIST_URL + playlist.id} target='_blank' rel='noreferrer'> {playlistName}</a>...</h3>
                <div className='tracklist'>
                  <div className='tracklist-header'>
                    <p>From these tracks:</p>
                  </div>
                    <Tracklist playlist={playlist}/>
                </div>
                <div className='artist-list'>
                  <div className='artist-header'>
                    <p>And these artists...</p>
                  </div>
                    <ArtistList artists={artists}/>
                </div>
              <div className='boba-wizard'>
              <h4>
                Boba Wizard says:
              </h4>
              <p>"{recommendation.content}"</p>
              <div className='boba-wizard-thank-you'></div>
              <p>Enjoy your drink! - Boba Wizard</p>
              </div>
            </div>
          </div>
          :
          <div></div>
        }
        
      </header>
    </div>
  );
}

export default App;
