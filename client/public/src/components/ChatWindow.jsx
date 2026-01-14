import React, { useEffect, useState, useContext, useRef } from 'react';
import { io } from 'socket.io-client';
import API, { setToken } from '../api/api';
import { AuthContext } from '../context/AuthContext';

export default function ChatWindow(){
  const { user, token } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);

  useEffect(()=>{
    setToken(token);
    if(!user) return;
    socketRef.current = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000');
    socketRef.current.emit('join', { userId: user.id });
    socketRef.current.on('bot_message', (m) => {
      setMessages(prev => [...prev, { role:'bot', text: m.text }]);
      // TTS: play voice
      if(window.speechSynthesis){
        const utter = new SpeechSynthesisUtterance(m.text);
        window.speechSynthesis.speak(utter);
      }
    });
    return ()=> socketRef.current.disconnect();
  }, [user, token]);

  const send = () => {
    if(!input.trim()) return;
    const text = input.trim();
    setMessages(prev => [...prev, { role:'user', text }]);
    setInput('');
    socketRef.current.emit('message', { userId: user.id, text });
    // Optionally call /api/openai/chat for richer reply
  };

  return (
    <div style={{ display: 'flex', flexDirection:'column', height:'100%' }}>
      <div style={{ flex:1, overflow:'auto', padding:10 }}>
        {messages.map((m,i)=>(
          <div key={i} style={{ margin:6, textAlign: m.role === 'user' ? 'right' : 'left' }}>
            <div style={{
              display:'inline-block',
              background: m.role==='user' ? '#0ea5e9' : '#111827',
              color: m.role==='user' ? '#001' : '#fff',
              padding:'10px 14px',
              borderRadius:12,
              maxWidth:'70%'
            }}>{m.text}</div>
          </div>
        ))}
      </div>
      <div style={{ display:'flex', gap:8 }}>
        <input value={input} onChange={e=>setInput(e.target.value)} style={{ flex:1,padding:10 }}/>
        <button onClick={send} style={{ padding:10 }}>Send</button>
      </div>
    </div>
  );
}
