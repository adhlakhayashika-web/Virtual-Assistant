import React, { useState, useEffect } from 'react';

export default function VoiceControl(){
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  useEffect(()=>{
    if(!SpeechRecognition) return;
    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = 'en-US';

    rec.onresult = (e) => {
      const t = Array.from(e.results).map(r=>r[0].transcript).join('');
      setTranscript(t);
      // You can send `t` to chat via socket or API.
      setListening(false);
    };
    rec.onend = () => setListening(false);

    if(listening){
      rec.start();
    } else {
      rec.stop?.();
    }
    return () => rec.stop?.();
  }, [listening]);

  return (
    <div style={{ marginBottom:15 }}>
      <button onClick={()=> setListening(s=>!s)} style={{ padding:10, borderRadius:8 }}>
        {listening ? 'Stop Listening 🔴' : 'Start Voice 🎙️'}
      </button>
      <div style={{ marginTop:8 }}>{transcript && <em>Heard: {transcript}</em>}</div>
    </div>
  );
}
