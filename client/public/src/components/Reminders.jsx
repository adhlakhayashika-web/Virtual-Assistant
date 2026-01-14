import React, { useEffect, useState, useContext } from 'react';
import API, { setToken } from '../api/api';
import { AuthContext } from '../context/AuthContext';

export default function Reminders(){
  const { token } = useContext(AuthContext);
  const [list, setList] = useState([]);
  useEffect(()=> {
    setToken(token);
    async function fetchReminders(){
      try {
        const res = await API.get('/reminders');
        setList(res.data);
      } catch(e) { console.error(e); }
    }
    fetchReminders();
  }, [token]);

  return (
    <div style={{ marginTop:12 }}>
      <h4>Reminders</h4>
      <ul>
        {list.map(r=> <li key={r._id}>{r.title} — {new Date(r.dueAt).toLocaleString()}</li>)}
      </ul>
    </div>
  );
}
