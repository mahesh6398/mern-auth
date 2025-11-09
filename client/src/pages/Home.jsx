import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* -----------------------------------------------------
         NEW: Digital Grid and Ambient Glows
      -------------------------------------------------------- */}
      <div className="digital-grid"></div>
      <div className="scanline-shimmer"></div>
      <div className="ambient-glow-green"></div>
      <div className="ambient-glow-pink"></div>
      
      {/* --- CONTENT START --- */}
      <div className="overlay-content">
        
        <h1 className="glitch" data-text="NEO-EARTH">NEO-EARTH</h1>
        
        <p className="storyline">
          The world we knew is gone. Burnt skies. Flooded cities. Silence where nature once sang.<br />
          Above us, millions of tons of space debris drift—a graveyard of our ambition.<br />
          We live in the shadow of a planet we failed to protect.
        </p>

        <div className="hero-ctas">
          <a href="/signup" className="cta-primary">
            Secure Your Sector Access
          </a> 
          <p className="cta-small-print">
            Powered by MERN: Real-time data from surviving communication nodes.
          </p>
        </div>

        <div className="feature-teaser">
          <div className="teaser-card">
            <h3>[01] Data Logs</h3>
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
