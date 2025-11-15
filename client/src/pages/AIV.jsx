// client/src/pages/AIV.jsx

import React, { useState, useEffect, useRef } from 'react';
import '../Home.css'; // For shared styles like .form-input-neon, .auth-button-primary, .comms-terminal-container

// --- Shadow DOM Web Components ---

// Widget 1: Shadow Input Panel
class ShadowInputPanel extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
        :host { display: block; padding: 10px; border: 1px dashed #ffaa00; background: #1a1a1a; margin-bottom: 15px; }
        h5 { color: #00ff41; margin: 0 0 10px 0; font-family: 'Orbitron', sans-serif; font-size: 0.9rem; }
        label { color: #ccc; font-family: 'Share Tech Mono', monospace; display: block; margin-top: 8px; }
        input[type="text"] { 
          background: #0d0d0d; border: 1px solid #00ff41; color: #ffaa00; padding: 5px; width: calc(100% - 12px); 
          font-family: 'Share Tech Mono', monospace;
        }
        button { 
          background-color: #ffaa00; color: black; border: none; padding: 6px 12px; margin-top: 10px; cursor: pointer;
          font-family: 'Orbitron', sans-serif; font-size: 0.8rem;
        }
        .inner-toggle {
            display: flex; align-items: center; margin-top: 10px;
        }
        .inner-toggle input[type="checkbox"] { transform: scale(1.2); margin-right: 8px; }
        .inner-toggle label { margin-top: 0; display: inline; }
      </style>
      <h5>[ SHADOW-A ] - Secure Log</h5>
      <label for="shid">Auth ID:</label>
      <input type="text" id="shid" placeholder="Enter Secure ID">
      <div class="inner-toggle">
        <input type="checkbox" id="shactive">
        <label for="shactive">Activate Protocol</label>
      </div>
      <button onclick="alert('Shadow A Button Clicked!')">Execute Secure</button>
    `;
  }
}
if (!customElements.get('shadow-input-panel')) {
  customElements.define('shadow-input-panel', ShadowInputPanel);
}

// Widget 2: Shadow Button Cluster
class ShadowButtonCluster extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = `
        <style>
          :host { display: flex; flex-direction: column; padding: 10px; border: 1px dashed #ff0077; background: #1a1a1a; margin-bottom: 15px; }
          h5 { color: #ff0077; margin: 0 0 10px 0; font-family: 'Orbitron', sans-serif; font-size: 0.9rem; }
          .button-row { display: flex; gap: 8px; margin-top: 10px; }
          button { 
            background-color: #00ff41; color: black; border: none; padding: 6px 10px; cursor: pointer;
            font-family: 'Orbitron', sans-serif; font-size: 0.8rem; flex-grow: 1;
          }
          button:nth-child(even) { background-color: #ffaa00; }
        </style>
        <h5>[ SHADOW-B ] - Action Array</h5>
        <div class="button-row">
            <button onclick="alert('Shadow B Action 1')">Action 1</button>
            <button onclick="alert('Shadow B Action 2')">Action 2</button>
        </div>
        <div class="button-row">
            <button onclick="alert('Shadow B Action 3')">Action 3</button>
            <button onclick="alert('Shadow B Action 4')">Action 4</button>
        </div>
      `;
    }
  }
  if (!customElements.get('shadow-button-cluster')) {
    customElements.define('shadow-button-cluster', ShadowButtonCluster);
  }
// --- End Shadow DOM Web Components ---

function AIV() {
  const [showDynamicForm, setShowDynamicForm] = useState(false);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const iframeRefA = useRef(null);
  const iframeRefB = useRef(null);

  useEffect(() => {
    // Populate Iframe A with more elements
    if (iframeRefA.current) {
        const doc = iframeRefA.current.contentDocument;
        if (doc) {
            doc.body.style.backgroundColor = '#0d0d0d';
            doc.body.style.color = '#00ff41';
            doc.body.style.fontFamily = 'Share Tech Mono, monospace';
            doc.body.style.padding = '10px';
            doc.body.innerHTML = `
                <h6 style="color: #ffaa00; margin-top: 0; font-size: 0.9rem;">[ IFRAME-ALPHA ] - Sensor Data</h6>
                <p>Status: <span style="color:#00ff41;">Online</span></p>
                <input type="text" placeholder="Sensor ID" style="background: #222; border: 1px solid #00ff41; color: #ffaa00; width: calc(100% - 10px); padding: 5px;">
                <div style="margin-top: 10px;">
                    <input type="radio" id="rad1" name="sensor_type" value="temp" style="transform: scale(1.2);"><label for="rad1" style="margin-left: 5px;"> Temp</label>
                    <input type="radio" id="rad2" name="sensor_type" value="press" style="transform: scale(1.2); margin-left: 15px;"><label for="rad2" style="margin-left: 5px;"> Press</label>
                </div>
                <button onclick="alert('Iframe Alpha Clicked!')" style="background: #00ff41; color: black; border: none; padding: 5px 10px; margin-top: 10px;">Ping Sensor</button>
            `;
        }
    }
    // Populate Iframe B with even more elements (nested within its own container)
    if (iframeRefB.current) {
        const doc = iframeRefB.current.contentDocument;
        if (doc) {
            doc.body.style.backgroundColor = '#1a1a1a';
            doc.body.style.color = '#ff0077';
            doc.body.style.fontFamily = 'Share Tech Mono, monospace';
            doc.body.style.padding = '10px';
            doc.body.innerHTML = `
                <h6 style="color: #00ff41; margin-top: 0; font-size: 0.9rem;">[ IFRAME-BETA ] - Control Unit</h6>
                <div style="border: 1px solid #ff0077; padding: 8px; background: #0d0d0d;">
                    <label for="unit_id" style="display:block; margin-bottom: 5px;">Unit ID:</label>
                    <input type="text" id="unit_id" value="CU-001" style="background: #222; border: 1px solid #ff0077; color: #ff0077; width: calc(100% - 10px); padding: 5px;">
                    <select style="background: #222; border: 1px solid #ff0077; color: #ff0077; width: 100%; padding: 5px; margin-top: 8px;">
                        <option>Mode A</option>
                        <option>Mode B</option>
                    </select>
                    <button onclick="alert('Iframe Beta Confirm')" style="background: #ff0077; color: black; border: none; padding: 5px 10px; margin-top: 10px; float: right;">Confirm</button>
                    <div style="clear:both;"></div>
                </div>
            `;
        }
    }
  }, []);

  return (
    <div className='content-body-dark'>
        <div className='page-grid-overlay'></div>
        
        <div className='px-4 py-12 max-w-7xl mx-auto' style={{ position: 'relative', zIndex: 1 }}>
            
            <h1 className='text-4xl font-bold mb-8 terminal-header'>
                :: ADVANCED INTERFACE VALIDATION ::
            </h1>

            {/* Main Terminal Container - using CSS Grid for 2 columns */}
            <div className='comms-terminal-container' style={{ height: 'auto', maxHeight: 'none', padding: '30px', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
                
                {/* LEFT COLUMN: COMPLEX DATA INGESTION */}
                <div className="left-column">
                    <h2 style={{ color: '#ff0077', marginBottom: '20px', fontFamily: 'Orbitron', borderBottom: '1px solid #ff007755', paddingBottom: '10px' }}>
                        EXTERNAL SYSTEM INTERFACES
                    </h2>

                    {/* A. Shadow DOM Widgets */}
                    <p style={{ color: '#ccc', fontFamily: 'Orbitron', fontSize: '0.9rem', marginBottom: '10px' }}>SECURE WIDGETS (Shadow Roots):</p>
                    <shadow-input-panel></shadow-input-panel> {/* First Shadow DOM element */}
                    <shadow-button-cluster></shadow-button-cluster> {/* Second Shadow DOM element */}

                    {/* B. Nested Iframes */}
                    <p style={{ color: '#ccc', fontFamily: 'Orbitron', fontSize: '0.9rem', marginBottom: '10px' }}>EXTERNAL FEEDS (iFrames):</p>
                    <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #00ff41' }}>
                        <iframe 
                            ref={iframeRefA} 
                            style={{ width: '100%', height: '120px', border: '1px dashed #00ff4155' }}
                            title="External Data Feed Alpha"
                        />
                    </div>
                    <div style={{ marginBottom: '30px', padding: '10px', border: '1px solid #ff0077' }}>
                        <iframe 
                            ref={iframeRefB} 
                            style={{ width: '100%', height: '140px', border: '1px dashed #ff007755' }}
                            title="External Data Feed Beta"
                        />
                    </div>

                    {/* C. Dynamic Form */}
                    <h3 style={{ color: '#ffaa00', marginTop: '30px', borderBottom: '1px solid #ffaa0055', paddingBottom: '5px', fontFamily: 'Orbitron' }}>
                        DYNAMIC CONFIGURATION
                    </h3>
                    <button 
                        onClick={() => setShowDynamicForm(!showDynamicForm)} 
                        className="auth-button-primary" 
                        style={{ backgroundColor: '#ffaa00', color: 'black', marginBottom: '15px' }}
                    >
                        {showDynamicForm ? 'Hide Dynamic Fields' : 'Show Dynamic Fields'}
                    </button>
                    {showDynamicForm && (
                        <form className='flex flex-col gap-3 mt-4'>
                            <label style={{ color: '#00ff41', fontFamily: 'Share Tech Mono' }}>Mode:</label>
                            <select className="form-input-neon" style={{ padding: '8px' }}>
                                <option value="manual">Manual</option>
                                <option value="auto">Automated</option>
                            </select>
                            <label style={{ color: '#00ff41', fontFamily: 'Share Tech Mono' }}>Threshold:</label>
                            <input type="number" placeholder="Value (0-100)" className="form-input-neon" />
                            <div className="flex justify-between items-center mt-3">
                                <label style={{ color: '#00ff41', fontFamily: 'Share Tech Mono' }}>Alert Enabled:</label>
                                <input type="checkbox" style={{ transform: 'scale(1.5)', margin: '0 10px' }} defaultChecked />
                            </div>
                        </form>
                    )}

                    {/* D. More Buttons & Interactive Elements */}
                    <h3 style={{ color: '#00ff41', marginTop: '30px', borderBottom: '1px solid #00ff4155', paddingBottom: '5px', fontFamily: 'Orbitron' }}>
                        ACTION INITIATORS
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-4">
                        <button className="auth-button-primary" style={{ flex: '1 1 calc(50% - 10px)' }}>Deploy Unit</button>
                        <button className="auth-button-primary" style={{ flex: '1 1 calc(50% - 10px)' }}>Reset Link</button>
                        <button className="auth-button-primary" style={{ flex: '1 1 calc(33% - 10px)', backgroundColor: '#ffaa00' }}>Scan Grid</button>
                        <button className="auth-button-primary" style={{ flex: '1 1 calc(66% - 10px)', backgroundColor: '#ff0077' }} onClick={() => setIsModalOpen(true)}>Trigger Alert (Modal)</button>
                    </div>

                </div> {/* End Left Column */}

                {/* RIGHT COLUMN: SYSTEM MONITORS & LOGS */}
                <div className="right-column">
                    <h2 style={{ color: '#00ff41', marginBottom: '20px', fontFamily: 'Orbitron', borderBottom: '1px solid #00ff4155', paddingBottom: '10px' }}>
                        SYSTEM OVERVIEW & STATUS
                    </h2>

                    {/* A. Data Table (Simulated) */}
                    <p style={{ color: '#ccc', fontFamily: 'Orbitron', fontSize: '0.9rem', marginBottom: '10px' }}>ACTIVE PROCESSES:</p>
                    <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ffaa00', marginBottom: '20px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Share Tech Mono', fontSize: '0.8rem' }}>
                            <thead style={{ backgroundColor: '#ffaa0033', color: '#ffaa00' }}>
                                <tr>
                                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ffaa00' }}>PID</th>
                                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ffaa00' }}>Status</th>
                                    <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ffaa00' }}>Load</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(5)].map((_, i) => (
                                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'rgba(0,0,0,0.1)' : 'transparent' }}>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #ffaa0011', color: '#00ff41' }}>P{100 + i}</td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #ffaa0011', color: i % 3 === 0 ? '#ff0077' : '#00ff41' }}>{i % 3 === 0 ? 'CRITICAL' : 'OK'}</td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #ffaa0011', color: '#ffaa00' }}>{15 + (i * 10)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* B. Progress Bar & Slider (Simulated) */}
                    <p style={{ color: '#ccc', fontFamily: 'Orbitron', fontSize: '0.9rem', marginBottom: '10px' }}>POWER COUPLING:</p>
                    <div style={{ width: '100%', backgroundColor: '#333', border: '1px solid #00ff41', marginBottom: '20px' }}>
                        <div style={{ width: '75%', height: '20px', backgroundColor: '#00ff41', boxShadow: '0 0 8px #00ff41' }}></div>
                    </div>
                    <label style={{ color: '#ccc', fontFamily: 'Share Tech Mono', display: 'block', marginBottom: '5px' }}>Power Output (75%):</label>
                    <input type="range" min="0" max="100" value="75" className="slider" style={{ width: '100%', marginBottom: '30px' }} />

                    {/* C. Collapsible Side Panel Trigger */}
                    <h3 style={{ color: '#ff0077', marginTop: '30px', borderBottom: '1px solid #ff007755', paddingBottom: '5px', fontFamily: 'Orbitron' }}>
                        DEBUG CONSOLE
                    </h3>
                    <button 
                        onClick={() => setShowSidePanel(!showSidePanel)} 
                        className="auth-button-primary" 
                        style={{ backgroundColor: '#ff0077', color: 'black', width: '100%', marginTop: '15px' }}
                    >
                        {showSidePanel ? 'Close Debug Log' : 'Open Debug Log'}
                    </button>
                    {showSidePanel && (
                        <div style={{ border: '1px dashed #ffaa00', padding: '10px', marginTop: '15px', background: 'black', maxHeight: '200px', overflowY: 'scroll' }}>
                            <p style={{ color: '#ffaa00', fontSize: '0.8rem', fontFamily: 'Share Tech Mono' }}>[ DEBUG ] Process 0x89AA initialized.</p>
                            <p style={{ color: '#00ff41', fontSize: '0.8rem', fontFamily: 'Share Tech Mono' }}>[ INFO  ] Comm-link established. ID: BETA-77.</p>
                            <p style={{ color: '#ff0077', fontSize: '0.8rem', fontFamily: 'Share Tech Mono' }}>[ ERROR ] Memory leak in buffer 0x12FF.</p>
                            <p style={{ color: '#ccc', fontSize: '0.8rem', fontFamily: 'Share Tech Mono' }}>[ TRACE ] Stack overflow detected in func XYZ.</p>
                            {[...Array(5)].map((_, i) => (
                                <p key={i} style={{ color: '#ffaa00', fontSize: '0.8rem', fontFamily: 'Share Tech Mono' }}>[ DEBUG ] Loop {i+1} completed.</p>
                            ))}
                        </div>
                    )}
                </div> {/* End Right Column */}

            </div> {/* End comms-terminal-container */}

        </div>

        {/* --- MODAL POPUP: Alert Confirmation --- */}
        {isModalOpen && (
            <div className="modal-overlay">
                <div className="modal-content auth-terminal-box">
                    <h2 style={{ color: '#ff0077', fontFamily: 'Orbitron', marginBottom: '15px' }}>
                        CRITICAL ALERT
                    </h2>
                    <p style={{ color: '#ccc', fontFamily: 'Share Tech Mono', marginBottom: '20px' }}>
                        Anomaly detected in Sector 4. Manual intervention required.
                    </p>
                    <div className='flex justify-center gap-4'>
                        <button 
                            onClick={() => setIsModalOpen(false)} 
                            className="auth-button-primary" 
                            style={{ backgroundColor: '#555', color: '#ccc' }}
                        >
                            ACKNOWLEDGE
                        </button>
                    </div>
                </div>
            </div>
        )}

    </div>
  );
}

export default AIV;
