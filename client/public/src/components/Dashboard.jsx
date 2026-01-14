import React from 'react';
import Reminders from './Reminders';

export default function Dashboard(){
  return (
    <div>
      <h3>Overview</h3>
      <p>Quick actions, stats, and mood summary will appear here.</p>
      <Reminders />
    </div>
  );
}
