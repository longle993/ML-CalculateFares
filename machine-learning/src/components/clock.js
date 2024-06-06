import React, { useState, useEffect } from 'react';

const getTimeInBoston = () => {
  const offsetHours = -4; // Múi giờ của Boston: UTC-4
  const d = new Date();
  const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  const localTime = new Date(utc + (3600000 * offsetHours));
  return localTime;
};

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(getTimeInBoston());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getTimeInBoston());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>{currentTime.toLocaleString()}</p>
    </div>
  );
};

export default Clock;
