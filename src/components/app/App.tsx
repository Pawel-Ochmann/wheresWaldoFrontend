import { Link } from 'react-router-dom';
import styles from './styles.module.css';

function App() {
  return (
    <div>
      <h1>Where is Waldo?</h1>
      <div className={styles.container}>
        <div className={styles.gameBox}>
          <img src='/wally1.png' alt='' />
          <Link to='/game' state={{ game: 1 }}>
            <button>Start game!</button>
          </Link>
        </div>
        <div className={styles.gameBox}>
          <img src='/wally2.png' alt='' />
          <Link to='/game' state={{ game: 2 }}>
            <button>Start game!</button>
          </Link>
        </div>
        <div className={styles.gameBox}>
          <img src='/wally3.png' alt='' />
          <Link to='/game' state={{ game: 3 }}>
            <button>Start game!</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
