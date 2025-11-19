import React from 'react';
import './Home.css'; // Import Home.css to access the .page-grid-overlay class

function About() {
  return (
    // Apply the dark background style to the main container
    <div className='content-body-dark' id="Manifest">
        {/* Apply the digital grid overlay */}
        <div className='page-grid-overlay'></div>
        
        <div className='px-4 py-12 max-w-4xl mx-auto' style={{ position: 'relative', zIndex: 1 }}>
            
            <h1 className='text-4xl font-bold mb-8' style={{ color: '#ff0077', textShadow: '0 0 10px #ff007755' }}>
                :: MANIFEST 001.03 ::
            </h1>
            
            <h2 className='text-2xl font-bold mb-4' style={{ color: '#00ff41' }}>
                PROTOCOL.ORIGIN: The Cassandra Initiative
            </h2>
            
            <p className='mb-4' style={{ fontFamily: 'Share Tech Mono', color: '#ccc', lineHeight: 1.8 }}>
                NEO-EARTH HQ is not a sanctuary—it is a secure data repository and communication gateway for the scattered remnants of humanity. This system was commissioned 20 years post-Collapse, driven by the belief that survival depends on unified, clean data, not blind hope. We are the last log of what was and the only tool for what can be.
            </p>

            <div style={{ borderLeft: '3px solid #00ff41', paddingLeft: '15px', margin: '30px 0' }}>
                <h3 className='text-xl font-bold mb-2' style={{ color: '#ff0077' }}>
                    SYSTEM.SPEC: MERN Core
                </h3>
                <ul style={{ listStyleType: 'none', paddingLeft: '0', fontFamily: 'Share Tech Mono', color: '#00ff41', lineHeight: 1.6 }}>
                    <li><span style={{ color: '#ff0077' }}>[ MONGO.DB ]</span>: Data Logs - Flexible, resilient NoSQL architecture.</li>
                    <li><span style={{ color: '#ff0077' }}>[ EXPRESS/NODE ]</span>: Comms Server - Secure, asynchronous routing for low-latency command transfer.</li>
                    <li><span style={{ color: '#ff0077' }}>[ REACT.JS ]</span>: Sector Interface - High-speed, component-based rendering for tactical displays.</li>
                    <li><span style={{ color: '#ff0077' }}>[ JWT AUTH ]</span>: Access Console - Encrypted token validation; access is prioritized by clearance level.</li>
                </ul>
            </div>
            
            <p className='mb-4' style={{ fontFamily: 'Share Tech Mono', color: '#ccc', lineHeight: 1.8 }}>
                Warning: The system is under constant threat from rogue AI entities and competing factions. Any unauthorized access, data corruption, or breach of the Comms Log will result in immediate termination of sector access. Maintain vigilance. Trust the data.
            </p>

            <p className='text-center mt-8' style={{ color: '#00ff41', textShadow: '0 0 5px #00ff4155', fontFamily: 'Orbitron' }}>
                // END TRANSMISSION. LOGGING OPEN. //
            </p>
        </div>
    </div>
  )
}

export default About
