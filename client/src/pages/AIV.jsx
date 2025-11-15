// client/src/pages/AIV.jsx

import React, { useState, useEffect, useRef } from 'react';
import './Home.css'; 

// --- Shadow DOM Web Components (UNCHANGED) ---
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
  // NEW: Language State
  const [language, setLanguage] = useState('en'); // 'en' for English, 'de' for Neo-Germanic

  const iframeRefA = useRef(null);
  const iframeRefB = useRef(null);

  // NEW: Translations Object
  const translations = {
    en: {
      pageTitle: "ADVANCED INTERFACE VALIDATION",
      externalInterfaces: "EXTERNAL SYSTEM INTERFACES",
      secureWidgets: "SECURE WIDGETS (Shadow Roots):",
      externalFeeds: "EXTERNAL FEEDS (iFrames):",
      dynamicConfig: "DYNAMIC CONFIGURATION",
      showDynamicFields: "Show Dynamic Fields",
      hideDynamicFields: "Hide Dynamic Fields",
      mode: "Mode:",
      threshold: "Threshold:",
      alertEnabled: "Alert Enabled:",
      actionInitiators: "ACTION INITIATORS",
      deployUnit: "Deploy Unit",
      resetLink: "Reset Link",
      scanGrid: "Scan Grid",
      triggerAlert: "Trigger Alert (Modal)",
      systemOverview: "SYSTEM OVERVIEW & STATUS",
      activeProcesses: "ACTIVE PROCESSES:",
      powerCoupling: "POWER COUPLING:",
      powerOutput: "Power Output (75%):",
      systemMetrics: "SYSTEM METRICS",
      debugConsole: "DEBUG CONSOLE",
      openDebugLog: "Open Debug Log",
      closeDebugLog: "Close Debug Log",
      criticalAlertTitle: "CRITICAL ALERT",
      criticalAlertMessage: "Anomaly detected in Sector 4. Manual intervention required.",
      acknowledge: "ACKNOWLEDGE",
      // Iframe A (will be passed as prop or handled by content script if complex)
      iframeASensorData: "[ IFRAME-ALPHA ] - Sensor Data",
      iframeAStatus: "Status: Online",
      iframeASensorID: "Sensor ID",
      iframeATempSensor: "Temp Sensor A",
      iframeAPressSensor: "Press Sensor B",
      iframeACalibration: "Calibration:",
      iframeANotes: "Diagnostic Notes",
      iframeAPing: "Ping Sensor & Send Data",
      // Iframe B (will be passed as prop or handled by content script if complex)
      iframeBControlUnit: "[ IFRAME-BETA ] - Control Unit",
      iframeBUnitID: "Unit ID:",
      iframeBOpMode: "Operation Mode:",
      iframeBForceOverride: "Force Override:",
      iframeBConfirm: "Confirm Actions",
      iframeBReset: "Reset Unit",
      iframeBModeStandby: "Standby",
      iframeBModeActive: "Active Scan",
      iframeBModeMaintenance: "Maintenance",
    },
    de: { // Neo-Germanic (for demo)
      pageTitle: "ERWEITERTE SCHNITTSTELLEN-VALIDIERUNG",
      externalInterfaces: "EXTERNE SYSTEM-SCHNITTSTELLEN",
      secureWidgets: "SICHERE WIDGETS (Shadow Roots):",
      externalFeeds: "EXTERNE FEEDS (iFrames):",
      dynamicConfig: "DYNAMISCHE KONFIGURATION",
      showDynamicFields: "Dynamische Felder anzeigen",
      hideDynamicFields: "Dynamische Felder verbergen",
      mode: "Modus:",
      threshold: "Schwelle:",
      alertEnabled: "Alarm aktiviert:",
      actionInitiators: "AKTIONSAUSLÖSER",
      deployUnit: "Einheit bereitstellen",
      resetLink: "Verbindung zurücksetzen",
      scanGrid: "Gitter scannen",
      triggerAlert: "Alarm auslösen (Modal)",
      systemOverview: "SYSTEMÜBERSICHT & STATUS",
      activeProcesses: "AKTIVE PROZESSE:",
      powerCoupling: "ENERGIEKOPPLUNG:",
      powerOutput: "Leistung (75%):",
      systemMetrics: "SYSTEMMETRIKEN",
      debugConsole: "DEBUG-KONSOLE",
      openDebugLog: "Debug-Log öffnen",
      closeDebugLog: "Debug-Log schließen",
      criticalAlertTitle: "KRITISCHER ALARM",
      criticalAlertMessage: "Anomalie in Sektor 4 erkannt. Manuelle Intervention erforderlich.",
      acknowledge: "BESTÄTIGEN",
      // Iframe A (will be passed as prop or handled by content script if complex)
      iframeASensorData: "[ IFRAME-ALPHA ] - Sensor-Daten",
      iframeAStatus: "Status: Online",
      iframeASensorID: "Sensor ID",
      iframeATempSensor: "Temperatursensor A",
      iframeAPressSensor: "Drucksensor B",
      iframeACalibration: "Kalibrierung:",
      iframeANotes: "Diagnose-Notizen",
      iframeAPing: "Sensor pingen & Daten senden",
      // Iframe B (will be passed as prop or handled by content script if complex)
      iframeBControlUnit: "[ IFRAME-BETA ] - Kontrolleinheit",
      iframeBUnitID: "Einheit ID:",
      iframeBOpMode: "Operationsmodus:",
      iframeBForceOverride: "Zwangige Überschreibung:",
      iframeBConfirm: "Aktionen bestätigen",
      iframeBReset: "Einheit zurücksetzen",
      iframeBModeStandby: "Bereitschaft",
      iframeBModeActive: "Aktiver Scan",
      iframeBModeMaintenance: "Wartung",
    }
  };

  const t = translations[language]; // Current translation object

  useEffect(() => {
    // Populate Iframe A with more elements, increased content to force scroll
    if (iframeRefA.current) {
        const doc = iframeRefA.current.contentDocument;
        if (doc) {
            doc.body.style.backgroundColor = '#0d0d0d';
            // FIX: Corrected fontFamily string literal
            doc.body.style.fontFamily = 'Share Tech Mono, monospace'; 
            doc.body.style.color = '#00ff41';
            doc.body.style.padding = '10px';
            // Inject translated content
            doc.body.innerHTML = `
                <h6 style="color: #ffaa00; margin-top: 0; font-size: 0.9rem;">${t.iframeASensorData}</h6>
                <p>${t.iframeAStatus}: <span style="color:#00ff41;">Online</span></p>
                <input type="text" placeholder="${t.iframeASensorID}" style="background: #222; border: 1px solid #00ff41; color: #ffaa00; width: calc(100% - 10px); padding: 5px; margin-bottom: 8px;">
                <div style="margin-bottom: 10px;">
                    <input type="radio" id="rad1" name="sensor_type" value="temp" style="transform: scale(1.2);"><label for="rad1" style="margin-left: 5px;"> ${t.iframeATempSensor}</label>
                    <br/>
                    <input type="radio" id="rad2" name="sensor_type" value="press" style="transform: scale(1.2); margin-top: 5px;"><label for="rad2" style="margin-left: 5px;"> ${t.iframeAPressSensor}</label>
                </div>
                <label style="display:block; color:#ccc; margin-bottom:5px;">${t.iframeACalibration}</label>
                <select style="background: #222; border: 1px solid #00ff41; color: #ffaa00; width: 100%; padding: 5px; margin-bottom: 10px;">
                    <option>Standard</option>
                    <option>High Precision</option>
                </select>
                <textarea placeholder="${t.iframeANotes}" rows="3" style="background: #222; border: 1px solid #00ff41; color: #ffaa00; width: calc(100% - 10px); padding: 5px; margin-bottom: 10px;"></textarea>
                <button onclick="alert('Iframe Alpha Clicked!')" style="background: #00ff41; color: black; border: none; padding: 5px 10px; margin-top: 10px;">${t.iframeAPing}</button>
            `;
        }
    }
    // Populate Iframe B with even more elements (nested within its own container)
    if (iframeRefB.current) {
        const doc = iframeRefB.current.contentDocument;
        if (doc) {
            doc.body.style.backgroundColor = '#1a1a1a';
            // FIX: Corrected fontFamily string literal
            doc.body.style.fontFamily = 'Share Tech Mono, monospace'; 
            doc.body.style.color = '#ff0077';
            doc.body.style.padding = '10px';
            // Inject translated content
            doc.body.innerHTML = `
                <h6 style="color: #00ff41; margin-top: 0; font-size: 0.9rem;">${t.iframeBControlUnit}</h6>
                <div style="border: 1px solid #ff0077; padding: 8px; background: #0d0d0d; margin-bottom: 10px;">
                    <label for="unit_id" style="display:block; margin-bottom: 5px;">${t.iframeBUnitID}</label>
                    <input type="text" id="unit_id" value="CU-001" style="background: #222; border: 1px solid #ff0077; color: #ff0077; width: calc(100% - 10px); padding: 5px; margin-bottom: 8px;">
                    <label for="mode_sel" style="display:block; margin-bottom: 5px;">${t.iframeBOpMode}</label>
                    <select id="mode_sel" style="background: #222; border: 1px solid #ff0077; color: #ff0077; width: 100%; padding: 5px; margin-bottom: 8px;">
                        <option>${t.iframeBModeStandby}</option>
                        <option>${t.iframeBModeActive}</option>
                        <option>${t.iframeBModeMaintenance}</option>
                    </select>
                    <div style="display:flex; align-items:center; margin-top:10px; justify-content:space-between;">
                        <label for="force_override" style="margin-top:0;">${t.iframeBForceOverride}</label>
                        <input type="checkbox" id="force_override" style="transform: scale(1.2);">
                    </div>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button onclick="alert('Iframe Beta Confirm')" style="background: #ff0077; color: black; border: none; padding: 5px 10px; flex-grow: 1;">${t.iframeBConfirm}</button>
                    <button onclick="alert('Iframe Beta Reset')" style="background: #555; color: white; border: none; padding: 5px 10px; flex-grow: 1;">${t.iframeBReset}</button>
                </div>
            `;
        }
    }
  }, [language]); // Re-run effect when language changes

  return (
    <div className='content-body-dark'>
        <div className='page-grid-overlay'></div>
        
        <div className='px-4 py-12 max-w-7xl mx-auto' style={{ position: 'relative', zIndex: 1 }}>
            
            <h1 className='text-4xl font-bold mb-8 terminal-header'>
                :: {t.pageTitle} ::
            </h1>
            
            {/* NEW: Language Selector for PoC */}
            <div style={{ position: 'absolute', top: '100px', right: '40px', zIndex: 100 }}>
                <label style={{ color: '#ccc', marginRight: '10px', fontFamily: 'Share Tech Mono' }}>Language:</label>
                <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                    className="form-input-neon"
                    style={{ padding: '5px 10px' }}
                >
                    <option value="en">English</option>
                    <option value="de">Neo-Germanic</option>
                </select>
            </div>


            {/* Main Terminal Container - using CSS Grid for 2 columns */}
            <div className='comms-terminal-container' style={{ height: 'auto', maxHeight: 'none', padding: '30px', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
                
                {/* LEFT COLUMN: COMPLEX DATA INGESTION */}
                <div className="left-column">
                    <h2 style={{ color: '#ff0077', marginBottom: '20px', fontFamily: 'Orbitron', borderBottom: '1px solid #ff007755', paddingBottom: '10px' }}>
                        {t.externalInterfaces}
                    </h2>

                    {/* A. Shadow DOM Widgets */}
                    <p style={{ color: '#ccc', fontFamily: 'Orbitron', fontSize: '0.9rem', marginBottom: '10px' }}>{t.secureWidgets}</p>
                    <shadow-input-panel></shadow-input-panel> {/* First Shadow DOM element */}
                    <shadow-button-cluster></shadow-button-cluster> {/* Second Shadow DOM element */}

                    {/* B. Nested Iframes - HEIGHTS INCREASED HERE */}
                    <p style={{ color: '#ccc', fontFamily: 'Orbitron', fontSize: '0.9rem', marginBottom: '10px' }}>{t.externalFeeds}</p>
                    <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #00ff41' }}>
                        <iframe 
                            ref={iframeRefA} 
                            style={{ width: '100%', height: '220px', border: '1px dashed #00ff4155' }} /* Increased Height */
                            title="External Data Feed Alpha"
                        />
                    </div>
                    <div style={{ marginBottom: '30px', padding: '10px', border: '1px solid #ff0077' }}>
                        <iframe 
                            ref={iframeRefB} 
                            style={{ width: '100%', height: '240px', border: '1px dashed #ff007755' }} /* Increased Height */
                            title="External Data Feed Beta"
                        />
                    </div>

                    {/* C. Dynamic Form */}
                    <h3 style={{ color: '#ffaa00', marginTop: '30px', borderBottom: '1px solid #ffaa0055', paddingBottom: '5px', fontFamily: 'Orbitron' }}>
                        {t.dynamicConfig}
                    </h3>
                    <button 
                        onClick={() => setShowDynamicForm(!showDynamicForm)} 
                        className="auth-button-primary" 
                        style={{ backgroundColor: '#ffaa00', color: 'black', marginBottom: '15px' }}
                    >
                        {showDynamicForm ? t.hideDynamicFields : t.showDynamicFields}
                    </button>
                    {showDynamicForm && (
                        <form className='flex flex-col gap-3 mt-4'>
                            <label style={{ color: '#00ff41', fontFamily: 'Share Tech Mono' }}>{t.mode}</label>
                            <select className="form-input-neon" style={{ padding: '8px' }}>
                                <option value="manual">Manual</option>
                                <option value="auto">Automated</option>
                            </select>
                            <label style={{ color: '#00ff41', fontFamily: 'Share Tech Mono' }}>{t.threshold}</label>
                            <input type="number" placeholder="Value (0-100)" className="form-input-neon" />
                            <div className="flex justify-between items-center mt-3">
                                <label style={{ color: '#00ff41', fontFamily: 'Share Tech Mono' }}>{t.alertEnabled}</label>
                                <input type="checkbox" style={{ transform: 'scale(1.5)', margin: '0 10px' }} defaultChecked />
                            </div>
                        </form>
                    )}

                    {/* D. More Buttons & Interactive Elements */}
                    <h3 style={{ color: '#00ff41', marginTop: '30px', borderBottom: '1px solid #00ff4155', paddingBottom: '5px', fontFamily: 'Orbitron' }}>
                        {t.actionInitiators}
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-4">
                        <button className="auth-button-primary" style={{ flex: '1 1 calc(50% - 10px)' }}>{t.deployUnit}</button>
                        <button className="auth-button-primary" style={{ flex: '1 1 calc(50% - 10px)' }}>{t.resetLink}</button>
                        <button className="auth-button-primary" style={{ flex: '1 1 calc(33% - 10px)', backgroundColor: '#ffaa00' }}>{t.scanGrid}</button>
                        <button className="auth-button-primary" style={{ flex: '1 1 calc(66% - 10px)', backgroundColor: '#ff0077' }} onClick={() => setIsModalOpen(true)}>{t.triggerAlert}</button>
                    </div>

                </div> {/* End Left Column */}

                {/* RIGHT COLUMN: SYSTEM OVERVIEW & STATUS */}
                <div className="right-column">
                    <h2 style={{ color: '#00ff41', marginBottom: '20px', fontFamily: 'Orbitron', borderBottom: '1px solid #00ff4155', paddingBottom: '10px' }}>
                        {t.systemOverview}
                    </h2>

                    {/* A. Data Table (Simulated) */}
                    <p style={{ color: '#ccc', fontFamily: 'Orbitron', fontSize: '0.9rem', marginBottom: '10px' }}>{t.activeProcesses}</p>
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

                    {/* B. Power Coupling - Progress Bar & Slider */}
                    <p style={{ color: '#ccc', fontFamily: 'Orbitron', fontSize: '0.9rem', marginBottom: '10px' }}>{t.powerCoupling}</p>
                    <div style={{ width: '100%', backgroundColor: '#333', border: '1px solid #00ff41', marginBottom: '20px' }}>
                        <div style={{ width: '75%', height: '20px', backgroundColor: '#00ff41', boxShadow: '0 0 8px #00ff41' }}></div>
                    </div>
                    <label style={{ color: '#ccc', fontFamily: 'Share Tech Mono', display: 'block', marginBottom: '5px' }}>{t.powerOutput}</label>
                    <input type="range" min="0" max="100" value="75" className="slider" style={{ width: '100%', marginBottom: '30px' }} />

                    {/* C. System Metrics Display - Fills the empty space */}
                    <h3 style={{ color: '#ffaa00', marginTop: '30px', borderBottom: '1px solid #ffaa0055', paddingBottom: '5px', fontFamily: 'Orbitron' }}>
                        {t.systemMetrics}
                    </h3>
                    <div style={{ border: '1px solid #ffaa00', padding: '15px', background: 'black', marginBottom: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{ color: '#ccc', fontFamily: 'Share Tech Mono', fontSize: '0.8rem' }}>CPU:</span>
                            <div style={{ width: 'calc(100% - 60px)', backgroundColor: '#333', height: '15px', border: '1px solid #00ff41' }}>
                                <div style={{ width: '65%', height: '100%', backgroundColor: '#00ff41', boxShadow: '0 0 5px #00ff41' }}></div>
                            </div>
                            <span style={{ color: '#00ff41', fontFamily: 'Share Tech Mono', fontSize: '0.8rem' }}>65%</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <span style={{ color: '#ccc', fontFamily: 'Share Tech Mono', fontSize: '0.8rem' }}>MEM:</span>
                            <div style={{ width: 'calc(100% - 60px)', backgroundColor: '#333', height: '15px', border: '1px solid #ffaa00' }}>
                                <div style={{ width: '40%', height: '100%', backgroundColor: '#ffaa00', boxShadow: '0 0 5px #ffaa00' }}></div>
                            </div>
                            <span style={{ color: '#ffaa00', fontFamily: 'Share Tech Mono', fontSize: '0.8rem' }}>40%</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#ccc', fontFamily: 'Share Tech Mono', fontSize: '0.8rem' }}>NET:</span>
                            <div style={{ width: 'calc(100% - 60px)', backgroundColor: '#333', height: '15px', border: '1px solid #ff0077' }}>
                                <div style={{ width: '88%', height: '100%', backgroundColor: '#ff0077', boxShadow: '0 0 5px #ff0077' }}></div>
                            </div>
                            <span style={{ color: '#ff0077', fontFamily: 'Share Tech Mono', fontSize: '0.8rem' }}>88%</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <div style={{ 
                                width: '50px', 
                                height: '50px', 
                                borderRadius: '50%', 
                                border: '3px solid #00ff41', 
                                background: 'radial-gradient(circle, #00ff4133 0%, transparent 70%)',
                                boxShadow: '0 0 15px #00ff41'
                            }}></div>
                        </div>
                    </div>


                    {/* D. Collapsible Side Panel Trigger */}
                    <h3 style={{ color: '#ff0077', marginTop: '30px', borderBottom: '1px solid #ff007755', paddingBottom: '5px', fontFamily: 'Orbitron' }}>
                        {t.debugConsole}
                    </h3>
                    <button 
                        onClick={() => setShowSidePanel(!showSidePanel)} 
                        className="auth-button-primary" 
                        style={{ backgroundColor: '#ff0077', color: 'black', width: '100%', marginTop: '15px' }}
                    >
                        {showSidePanel ? t.closeDebugLog : t.openDebugLog}
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
                        {t.criticalAlertTitle}
                    </h2>
                    <p style={{ color: '#ccc', fontFamily: 'Share Tech Mono', marginBottom: '20px' }}>
                        {t.criticalAlertMessage}
                    </p>
                    <div className='flex justify-center gap-4'>
                        <button 
                            onClick={() => setIsModalOpen(false)} 
                            className="auth-button-primary" 
                            style={{ backgroundColor: '#555', color: '#ccc' }}
                        >
                            {t.acknowledge}
                        </button>
                    </div>
                </div>
            </div>
        )}

    </div>
  );
}

export default AIV;
