import imageHandler from '../../imageClickingHandler';
import { useState, useEffect } from 'react';
import Mark from '../mark/Mark';
import Info from '../info/Info';
import Timer from '../timer/Timer';
import RecordBox from '../recordBox/RecordBox';
import Footer from '../footer/Footer'
import { useLocation, Link } from 'react-router-dom';
import styles from './styles.module.css';

function Game() {
  const location = useLocation();
  const { game } = location.state;
  const [showMissInfo, setShowMissInfo] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [start, setStart] = useState(false);
  const [record, setRecord] = useState(0);
  const [position, setPosition] = useState(11);

  interface Coordinates {
    x: number;
    y: number;
  }
  const [coordinates, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 });

  let imageAddress: string = '';

  switch (game) {
    case 1:
      imageAddress = 'wally1.png';
      break;
    case 2:
      imageAddress = 'wally2.png';
      break;
    case 3:
      imageAddress = 'wally3.png';
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
      const { record, coordinates, recordToken, position } = data;

      if (imageHandler(e, coordinates)) {
        localStorage.removeItem('jwt');
        localStorage.setItem('record', recordToken);
        setStart(false);
        setRecord(record);
        setCoordinates(coordinates);
        setPosition(position);
        console.log('position: ', position);
      }
      else {
        setShowMissInfo(true);
        setTimeout(()=>{setShowMissInfo(false)}, 2000)
      }
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
      <div className={styles.titleContainer}>
        <h1>Quick, find wally!</h1>
        <Link to={'/'}>Go back to main page</Link>
      </div>
      {record !== 0 && <RecordBox record={record} gameId={game.toString()} position={position}/>}
      {start && <Timer time={time} setTime={setTime} />}

      <div className={styles.imageContainer}>
        {showMissInfo && <Info />}
        <img onClick={markWaldo} src={imageAddress} alt='' />
        {record !== 0 && <Mark position={coordinates} />}
      </div>
      <Footer/>
    </>
  );
}

export default Game;
