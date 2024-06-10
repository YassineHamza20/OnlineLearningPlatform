import { useEffect, useState } from 'react';

function ElapsedTime(time) {
  const [elapsedTime, setElapsedTime] = useState('');

  useEffect(() => {
    const timestamp = new Date(time);
    
    const calculateElapsedTime = () => {
      const currentTime = Date.now();
      if (isNaN(timestamp)) {
        setElapsedTime('');
      } else {
        const timeDifference = currentTime - timestamp;
        const hours = Math.floor(timeDifference / 3600000);
        const minutes = Math.floor(timeDifference / 60000);
  
        let formattedTime;
        
        if (minutes === 0) {
          formattedTime = 'Now';
        } else if (hours === 0) {
          formattedTime = `${minutes}m ago`;
        } else if (hours < 24) {
          formattedTime = `${hours}h ago`;
        } else {
          formattedTime = `${Math.floor(hours / 24)}d ago`;
        }
        setElapsedTime(formattedTime);
      }
    };

    calculateElapsedTime();

    const interval = setInterval(() => {
      calculateElapsedTime();
    }, 0);

    return () => clearInterval(interval);
  }, [time]);

  return elapsedTime;
}

export default ElapsedTime;
