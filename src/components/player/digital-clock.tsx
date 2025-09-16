'use client';
import { useState, useEffect } from 'react';

export default function DigitalClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    
    updateClock(); // Set initial time
    const timerId = setInterval(updateClock, 1000);

    return () => clearInterval(timerId);
  }, []);

  if (!time) return null;

  return (
    <div className="text-xl font-sans text-white bg-black/50 px-3 py-1 rounded-md shadow-lg">
      {time}
    </div>
  );
}
