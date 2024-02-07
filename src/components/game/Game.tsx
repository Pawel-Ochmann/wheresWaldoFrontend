import imageHandler from '../../imageClickingHandler';
import { useState, useEffect } from 'react';
import Mark from '../mark/Mark';
import Info from '../info/Info';
import Timer from '../timer/Timer';
import timeHandler from '../../timeHandler';
import { getTime } from '../../misc';
import { useLocation } from 'react-router-dom';

function Game() {
  const location = useLocation();
  const { game } = location.state;
  // const [mark, setMark] = useState(null);
  const [wasFound, setWasFound] = useState<boolean | null>(null);
  const [time, setTime] = useState<number>(0);
  const [start, setStart] = useState(false);
  const [record, setRecord] = useState(0);

  let imageAddress: string = '';

  switch (game) {
    case 1:
      imageAddress = 'wally1.png';
      break;
    case 2:
      imageAddress = 'wally2.png';
      break;
    case 3:
      imageAddress = 'wally3.jpeg';
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/start');
        if (!response.ok) {
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

  async function markWaldo(
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ): Promise<void> {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        throw new Error('JWT token not found in localStorage');
      }
      const response = await fetch('http://localhost:3000/stop', {
        method: 'POST', // or 'PUT', 'DELETE', etc.
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          game: game,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch JWT');
      }
      const data = await response.json();
      const { record, coordinates } = data;
      console.log(record);
      console.log('coordinates: ', coordinates);

      localStorage.removeItem('jwt');
      setStart(false);
      setRecord(record);

      // setMark(imageHandler(e, coordinates));
      imageHandler(e, coordinates)
        ? console.log(`Your record is ${timeHandler(time)}`)
        : '';
      setTimeout(() => {
        setWasFound(null);
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching JWT:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
  }

  return (
    <>
      <h1>Welcome in where's waldo game</h1>
      {record !== 0 && <p>{`your new record is ${getTime(record)}!`}</p>}
      {start && <Timer time={time} setTime={setTime} />}

      <div style={{ position: 'relative' }}>
        {wasFound !== null ? <Info wasFound={wasFound} /> : ''}
        <img onClick={markWaldo} src={imageAddress} alt='' />
        {/* {mark && <Mark position={mark} />} */}
      </div>
    </>
  );
}

export default Game;
