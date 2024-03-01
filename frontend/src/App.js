import './App.css';
import logo from './logo.svg';
import React from 'react';
import { useEffect, useState } from 'react';
import BobaIcon from './boba.svg';

function App() {
  const [playlistLink, setPlaylistLink] = useState('');
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Boba Recommender!
        </p>
        <div className="search">
                <input 
                    placeholder='Search for a playlist'
                    value={playlistLink}
                    onChange={(e) => setPlaylistLink(e.target.value)}
                />
                <img 
                    src={BobaIcon}
                    alt='search'
                    onClick={() => {console.log('clicked')}}
                />
        </div>
      </header>
    </div>
  );
}

export default App;
