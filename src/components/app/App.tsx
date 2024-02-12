import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import TopScores from '../topScores/TopScores';
import Footer from '../footer/Footer';
import axios from 'axios';

function App() {
  const [scores1, setScores1] = useState(false);
  const [scores2, setScores2] = useState(false);
  const [scores3, setScores3] = useState(false);

  const [records1, setRecords1] = useState<Record[] | null>(null);
  const [records2, setRecords2] = useState<Record[] | null>(null);
  const [records3, setRecords3] = useState<Record[] | null>(null);

  interface Record {
    name: string;
    record: number;
    date: string;
  }

  interface Records {
    rec1: Record[];
    rec2: Record[];
    rec3: Record[];
  }

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get<Records>(
          `http://localhost:3000/games/records`
        );
        const {
          rec1,
          rec2,
          rec3,
        }: { rec1: Record[]; rec2: Record[]; rec3: Record[] } = response.data;

        console.log(rec1, rec2, rec3);

        setRecords1(rec1);
        setRecords2(rec2);
        setRecords3(rec3);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchRecords();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Where is Waldo?</h1>
        <img src='./wally.png' alt='' />
      </div>
      <div className={styles.container}>
        <div className={styles.gameBox}>
          <img src='/wally1.png' alt='' />
          <Link to='/game' state={{ game: 1 }}>
            <button>Start game!</button>
          </Link>
          <button
            className={styles.scores}
            onClick={() => {
              setScores1((prev) => !prev);
            }}
          >
            {!scores1 ? 'Show top 10 scores' : 'Hide scores'}
            <div
              className={`${styles.triangle} ${scores1 ? styles.rotate : ''}`}
            ></div>
          </button>
          {scores1 ? (
            records1 === null ? (
              <p>Loading...</p>
            ) : (
              <TopScores records={records1} />
            )
          ) : null}
        </div>
        <div className={styles.gameBox}>
          <img src='/wally2.png' alt='' />
          <Link to='/game' state={{ game: 2 }}>
            <button>Start game!</button>
          </Link>
          <button
            className={styles.scores}
            onClick={() => {
              setScores2((prev) => !prev);
            }}
          >
            {!scores2 ? 'Show top 10 scores' : 'Hide scores'}
            <div
              className={`${styles.triangle} ${scores2 ? styles.rotate : ''}`}
            ></div>
          </button>
          {scores2 ? (
            records2 === null ? (
              <p>Loading...</p>
            ) : (
              <TopScores records={records2} />
            )
          ) : null}
        </div>
        <div className={styles.gameBox}>
          <img src='/wally3.png' alt='' />
          <Link to='/game' state={{ game: 3 }}>
            <button>Start game!</button>
          </Link>
          <button
            className={styles.scores}
            onClick={() => {
              setScores3((prev) => !prev);
            }}
          >
            {!scores3 ? 'Show top 10 scores' : 'Hide scores'}
            <div
              className={`${styles.triangle} ${scores3 ? styles.rotate : ''}`}
            ></div>
          </button>
          {scores3 ? (
            records3 === null ? (
              <p>Loading...</p>
            ) : (
              <TopScores records={records3} />
            )
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
