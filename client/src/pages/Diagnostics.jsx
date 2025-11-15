// client/src/pages/Diagnostics.jsx

import React, { useState } from 'react';
import './Home.css'; // Uses styles defined in Home.css

function Diagnostics() {
  const [systemStatus, setSystemStatus] = useState('Nominal');
  const [overrideActive, setOverrideActive] = useState(false);
  const [channelSelect, setChannelSelect] = useState('Comms-Relay-A');
  const [dataInput, setDataInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the Modal Popup

  const statusColor = systemStatus === 'Critical' ? '#ff0077' : systemStatus === 'Warning' ? '#ffaa00' : '#00ff41';

  const handleManualOverride = () => {
    setOverrideActive(!overrideActive);
    setSystemStatus(overrideActive ? 'Nominal' : 'Warning');
  };

  const handleSystemCheck = () => {
    setSystemStatus('Warning');
    console.log('System Check Initiated. Review Status Panels.');
  };

  const handleTransmitPayload = () => {
    // This is the action that triggers the modal
    if (dataInput) {
        setIsModalOpen(true);
    }
  };

  const confirmTransmission = () => {
      // Logic for confirming transmission
      console.log(`Payload transmitted on channel: ${channelSelect}`);
      setSystemStatus('Critical'); 
      setDataInput('');
      setIsModalOpen(false);
      console.log('Transmission initiated. Status set to CRITICAL.');
  };
  
  // Custom styled Button Component
  const NeonButton = ({ children, onClick, disabled = false, style = {} }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`auth-button-primary ${disabled ? 'disabled-override' : ''}`}
      style={{ ...style, backgroundColor: disabled ? '#333' : '#ff0077', transition: 'all 0.3s', fontSize: '1rem' }}
    >
      {children}
    </button>
  );

  return (
    <div className='content-body-dark'>
        {/* Digital Grid Background */}
        <div className='page-grid-overlay'></div>
        
        <div className='px-4 py-12 max-w-7xl mx-auto' style={{ position: 'relative', zIndex: 1 }}>
            
            <h1 className='text-4xl font-bold mb-8 terminal-header'>
                :: SYS.DIAGNOSTICS / MANUAL OVERRIDE ::
            </h1>

            {/* Main Diagnostics Terminal Container (Uses CSS Grid for two columns) */}
            <div className='comms-terminal-container' style={{ height: 'auto', maxHeight: 'none', padding: '30px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
                
                {/* 1. CONTROL PANEL (Left Side: Forms, Dropdown, Toggles) */}
                <div className="control-panel" style={{ borderRight: '1px dashed #00ff4122', paddingRight: '30px' }}>
                    <h2 style={{ color: '#ff0077', marginBottom: '20px', fontFamily: 'Orbitron', borderBottom: '1px solid #ff007755', paddingBottom: '10px' }}>
                        I/O CONTROLS
                    </h2>

                    {/* A. Form Inputs */}
                    <form className='flex flex-col gap-4 mb-8' onSubmit={(e) => e.preventDefault()}>
                        <label style={{ color: '#00ff41', fontFamily: 'Share Tech Mono' }}>
                            Target System ID:
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., SECTOR-A4-COMM"
                            className="form-input-neon"
                        />
                        
                        <label style={{ color: '#00ff41', fontFamily: 'Share Tech Mono' }}>
                            Data Injection Payload (Hex):
                        </label>
                        {/* Textarea Input Element */}
                        <textarea
                            placeholder="Enter raw payload data..."
                            className="form-input-neon"
                            rows="4"
                            value={dataInput}
                            onChange={(e) => setDataInput(e.target.value)}
                        />
                        
                        {/* B. Dropdown (Select) */}
                        <label style={{ color: '#00ff41', fontFamily: 'Share Tech Mono', marginTop: '10px' }}>
                            Communication Channel:
                        </label>
                        <select
                            className="form-input-neon"
                            value={channelSelect}
                            onChange={(e) => setChannelSelect(e.target.value)}
                            style={{ padding: '10px' }}
                        >
                            <option value="Comms-Relay-A">Comms Relay Alpha (Low)</option>
                            <option value="Comms-Relay-B">Comms Relay Beta (Medium)</option>
                            <option value="Comms-Relay-C">Comms Relay Gamma (High)</option>
                        </select>
                    </form>

                    {/* C. Toggles & Buttons */}
                    <div className="flex flex-col gap-4 mb-4">
                        {/* Enabled Button */}
                        <NeonButton onClick={handleSystemCheck}>
                            INITIATE SYSTEM CHECK
                        </NeonButton>
                        
                        {/* Toggle Switch Simulation / Secondary Button */}
                        <div className='flex justify-between items-center' style={{ fontFamily: 'Share Tech Mono', color: '#ccc' }}>
                            <span>EMERGENCY SHUTDOWN PROTOCOL:</span>
                            <button 
                                onClick={() => console.log('EMERGENCY SHUTDOWN TRIGGERED!')}
                                style={{
                                    backgroundColor: '#990000', color: 'white', padding: '5px 15px', borderRadius: '4px',
                                    border: '1px solid #ff0077', boxShadow: '0 0 5px #ff0077'
                                }}
                            >
                                EXECUTE
                            </button>
                        </div>

                        {/* Disabled Button (Controlled by dataInput state) */}
                        <NeonButton 
                            onClick={handleTransmitPayload} 
                            disabled={!dataInput} 
                            style={{ marginTop: '10px' }}
                        >
                            {dataInput ? 'TRANSMIT PAYLOAD (Opens Modal)' : 'PAYLOAD REQUIRED (DISABLED)'}
                        </NeonButton>
                    </div>

                    {/* D. Manual Override Button */}
                    <NeonButton 
                        onClick={handleManualOverride}
                        style={{ marginTop: '30px', backgroundColor: overrideActive ? '#00ff41' : '#ff0077' }}
                    >
                        {overrideActive ? 'DEACTIVATE OVERRIDE' : 'ACTIVATE MANUAL OVERRIDE'}
                    </NeonButton>

                </div>


                {/* 2. STATUS & OUTPUT PANEL (Right Side: Cards, Status, Iframe) */}
                <div className="status-panel">
                    <h2 style={{ color: '#ff0077', marginBottom: '20px', fontFamily: 'Orbitron', borderBottom: '1px solid #ff007755', paddingBottom: '10px' }}>
                        SYSTEM LIVE FEED
                    </h2>
                    
                    {/* A. Status Card */}
                    <div className="status-card teaser-card" style={{ marginBottom: '20px', border: `2px solid ${statusColor}`, boxShadow: `0 0 15px ${statusColor}55` }}>
                        <h3 style={{ color: statusColor }}>
                            GLOBAL SYSTEM STATUS: {systemStatus.toUpperCase()}
                        </h3>
                        <p style={{ color: '#ccc' }}>
                            Override: <span style={{ color: overrideActive ? '#00ff41' : '#ff0077' }}>{overrideActive ? 'ACTIVE' : 'INACTIVE'}</span>
                        </p>
                    </div>

                    {/* B. Simulated Output Panel (Iframe Embed Simulation) */}
                    <div style={{ height: '300px', width: '100%', border: '1px solid #00ff41', overflow: 'hidden', backgroundColor: 'black' }}>
                        <h3 style={{ color: '#00ff41', fontFamily: 'Share Tech Mono', padding: '10px', margin: 0, borderBottom: '1px solid #00ff4155' }}>
                            [ I/O CONSOLE OUTPUT ]
                        </h3>
                        <div className='log-entry' style={{ padding: '10px', fontSize: '0.85rem' }}>
                            <p style={{ color: '#ff0077' }}>{'>'} Attempting connection on {channelSelect}...</p>
                            <p style={{ color: '#00ff41' }}>{'>'} STATUS_CODE_200: Handshake success. Latency: 40ms.</p>
                            {systemStatus === 'Warning' && (
                                <p className="warning-message">{'>'} ALERT: Resource utilization spiking (78%). Review Depot Manifest.</p>
                            )}
                            <p style={{ color: '#ccc' }}>{'>'} Console waiting for manual command...</p>
                        </div>
                    </div>
                </div>

            </div> {/* End comms-terminal-container */}

        </div>

        {/* --- MODAL POPUP: Confirmation Overlay --- */}
        {isModalOpen && (
            <div className="modal-overlay">
                <div className="modal-content auth-terminal-box">
                    <h2 style={{ color: '#ff0077', fontFamily: 'Orbitron', marginBottom: '15px' }}>
                        CONFIRMATION OVERRIDE
                    </h2>
                    <p style={{ color: '#ccc', fontFamily: 'Share Tech Mono', marginBottom: '20px' }}>
                        WARNING: Transmitting a manual payload bypasses standard security protocols. Confirm transmission on channel **{channelSelect.toUpperCase()}**. This action is irreversible.
                    </p>
                    <p style={{ color: '#ffaa00', fontFamily: 'Share Tech Mono', marginBottom: '30px' }}>
                        Payload Size: {dataInput.length} bytes.
                    </p>

                    <div className='flex justify-between gap-4'>
                        {/* Modal Buttons */}
                        <NeonButton onClick={() => setIsModalOpen(false)} style={{ backgroundColor: '#555', color: '#ccc' }}>
                            CANCEL (Abort)
                        </NeonButton>
                        <NeonButton onClick={confirmTransmission} style={{ backgroundColor: '#00ff41' }}>
                            CONFIRM (Transmit)
                        </NeonButton>
                    </div>
                </div>
            </div>
        )}

    </div>
  );
}

export default Diagnostics;
