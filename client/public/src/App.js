import React from 'react';
import ChatWindow from './components/ChatWindow';
import Dashboard from './components/Dashboard';
import VoiceControl from './components/VoiceControl';

export default function App(){
  return (
    <div style={{ display:'flex', height:'100vh', background:'#0f172a', color:'#e6eef8' }}>
      <aside style={{ width:320, padding:20, borderRight:'1px solid rgba(255,255,255,0.03)' }}>
        <h2>Virtuo</h2>
        <VoiceControl />
        <Dashboard />
      </aside>
      <main style={{ flex:1, padding:20 }}>
        <ChatWindow />
      </main>
    </div>
  );
}
