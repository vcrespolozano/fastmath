import { useState, useEffect, useRef } from 'react';

const Crono = ({start, stop}) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  
  useEffect(() => {
    if (start && !isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    } else if (stop && isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  }, [start, stop, isRunning]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, [intervalRef]);
  
  const minutes = Math.floor(time / 60);
  const minutesStr = minutes.toString().padStart(2, "0");
  const seconds = time % 60;
  const secondsStr = seconds.toString().padStart(2, "0");

  return (
    <div className="crono">{minutesStr}:{secondsStr}</div>
  );
}

export default Crono;