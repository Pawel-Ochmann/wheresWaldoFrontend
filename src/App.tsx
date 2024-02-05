import './App.css';
import imageHandler from './imageClickingHandler';
import { useState, useEffect } from 'react';
import Mark from './Mark';
import Info from './Info';
import Timer from './Timer';
import timeHandler from './timeHandler';

function App() {
  const [mark, setMark] = useState(null);
  const [wasFound, setWasFound] = useState<boolean | null>(null);
  const [time, setTime] = useState<number>(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000');
        if (!response.ok) {
          console.log(response);
          throw new Error('Failed to fetch JWT');
        }
        const data = await response.json();
        const { token } = data;

        localStorage.setItem('jwt', token);
        setStart(true);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching JWT:', error.message);
        } else {
          console.error('Unknown error:', error);
        }
      }
    };

    fetchData();
  }, []);

  function markWaldo(e: MouseEvent, callback): void {
    setMark(callback(e));
    callback(e) ? setWasFound(true) : setWasFound(false);
    callback(e) ? console.log(`Your record is ${timeHandler(time)}`) : '';
    setTimeout(() => {
      setWasFound(null);
    }, 2000);
  }

  return (
    <>
      <h1>Welcome in where's waldo game</h1>
      {start && <Timer time={time} setTime={setTime} />}

      <div style={{ position: 'relative' }}>
        {wasFound !== null ? <Info wasFound={wasFound} /> : ''}
        <img
          onClick={(e) => {
            markWaldo(e, imageHandler);
          }}
          src='https://cdn.pixabay.com/photo/2015/02/07/13/36/computer-627220_1280.jpg'
          alt=''
        />
        {mark && <Mark position={mark} />}
      </div>
    </>
  );
}

export default App;
