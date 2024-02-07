import  React, { useEffect } from 'react';

interface TimerProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

const Timer= ({time, setTime}: TimerProps) => {
 
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 0.1);
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const tenths = Math.floor((time - Math.floor(time)) * 10);

  if (minutes > 0) {
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${tenths}`;
  } else {
    return `${seconds}.${tenths}`;
  }
};
  return (
    <div>
      <h1>{formatTime(time)}</h1>
    </div>
  );
};

export default Timer;
