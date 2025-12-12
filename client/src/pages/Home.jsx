import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container" id="Home">
      {/* --- Restored Cosmic Background Elements (Styled in CSS) --- */}
      <div className="stars"></div>
      <div className="stars"></div> 
      
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>

      <div className="meteor"></div>
      <div className="meteor"></div>
      <div className="meteor"></div>
      <div className="meteor"></div>
      
      {/* This element will be hidden by CSS but keeps the original file reference */}
      <div className="background-image" /> 
      
      {/* --- Page Content --- */}
      <div className="overlay-content">
        
        <h1 className="glitch" data-text="NEO-EARTH">NEO-EARTH</h1>
        
        <p className="storyline">
          The world we knew is gone. Burnt skies. Flooded cities. Silence where nature once sang.<br />
          Above us, millions of tons of space debris drift—a graveyard of our ambition.<br />
          We live in the shadow of a planet we failed to protect.
        </p>

        <div className="hero-ctas">
          <a href="" className="cta-primary">
            Secure Your Sector Access
          </a> 
          <p className="cta-small-print">
            Powered by MERN: Real-time data from surviving communication nodes.
          </p>
        </div>

        <div className="feature-teaser">
          <div className="teaser-card">
            <h3>[02] Comms Hub</h3>
            <p>Access encrypted mission reports and global resource manifests.</p>
          </div>
          <div className="teaser-card">
            <h3>[02] Comms Hub</h3>
            <p>Real-time P2P secure communication for surviving factions.</p>
          </div>
          <div className="teaser-card">
            <h3>[03] Sector Mapping</h3>
            <p>MongoDB-backed geographical data for tracking hazards and supply drops.</p>
          </div>
        </div>

      </div> {/* End overlay-content */}

    </div>
  );
}

export default Home;
