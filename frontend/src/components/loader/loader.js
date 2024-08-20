// Loader.js
import React, { useEffect, useState } from 'react';
import './loader.css'; // Import the CSS file for styling

const Loader = ({initialTime = 0}) => {

  const [time, setTime] = useState(initialTime);


  useEffect(() => {
    // Start a timer that increments the time every second
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-container">
      <span>{time}</span>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
