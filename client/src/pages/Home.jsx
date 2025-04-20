import React from 'react';
import './Home.css'; 

function Home() {
  return (
    <div className="home-container">
      <video autoPlay muted loop className="background-video">
        <source src="https://www.videvo.net/videvo_files/converted/2017_12/preview/171201_05_Space_4k_008.mp498280.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay-content">
        <h1 className="glitch" data-text="NEO-EARTH INITIATIVE">NEO-EARTH INITIATIVE</h1>
        <p className="subheading">Building a Green, AI-Driven Tomorrow 🌍🤖</p>
        <div className="buttons">
          <button className="btn primary">Join the Initiative</button>
          <button className="btn secondary">Learn More</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
