import React from 'react';
import './Home.css'; 

function Home() {
  return (
    <div className="home-container">
      <div className="background-image" />

      <div className="overlay-content">
        <h1 className="glitch" data-text="NEO-EARTH INITIATIVE">NEO-EARTH</h1>
        <p className="storyline">
          The world we knew is gone.<br />
          Burnt skies. Flooded cities. Silence where nature once sang.<br />
          Above us, millions of tons of space debris drift—a graveyard of our ambition.<br />
          We live in the shadow of a planet we failed to protect.<br />
          This is not the beginning... it's what's left of the end.
        </p>
      </div>
    </div>
  );
}

export default Home;


