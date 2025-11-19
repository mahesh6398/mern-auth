import React from 'react';
// Assuming the global CSS for dark mode and the grid are available via Header.css/Home.css imports
import './Home.css'; 

function Comms() {
  return (
    // Apply the dark background style to the main container
    <div className='content-body-dark' id="Comms">
        {/* Apply the digital grid overlay */}
        <div className='page-grid-overlay'></div>
        
        {/* The main content area, centered and styled as a secure terminal */}
        <div className='px-4 py-12 max-w-6xl mx-auto comms-terminal-container'>
            
            <h1 className='text-4xl font-bold mb-8 terminal-header'>
                <span style={{ color: '#00ff41' }}>{'>'}</span> CONSOLE.ID: **COMM_LOG_ALPHA**
            </h1>
            
            {/* The actual log display area */}
            <div className='comms-log-area'>
                <p className='log-entry initial-message'>
                    <span className='log-timestamp'>[00:00:01]</span> System initialization complete. Awaiting encrypted transmission handshake...
                </p>
                
                {/* Dummy Log Entries - Ready for MERN Data Integration */}
                <p className='log-entry warning-message'>
                    <span className='log-timestamp'>[00:00:15]</span> WARNING: Sector 7 comms array integrity 78%. Potential signal degradation.
                </p>
                <p className='log-entry success-message'>
                    <span className='log-timestamp'>[00:00:42]</span> Received Manifest update from **User: Sentinel-14**. Data integrity verified.
                </p>
                
                {/* This is where your MERN application would map dynamic message objects */}
                <div className='dynamic-feed-placeholder'>
                    // Waiting for new log data...
                </div>

            </div> {/* End comms-log-area */}

            {/* Input prompt at the bottom */}
            <div className='terminal-prompt'>
                <span style={{ color: '#ff0077' }}>{'>>'}</span> <input type="text" placeholder="Type command or message..." className='prompt-input'/>
            </div>

        </div>
    </div>
  );
}

export default Comms;
