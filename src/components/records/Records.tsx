import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { getTime } from '../../misc';
import { DateTime } from 'luxon';
import styles from './styles.module.css';

interface Record {
  name: string;
  record: number;
  date: string;
}

const Records = () => {
  const location = useLocation();
  const records: Record[] = location.state.records;

  return (
    <div className={styles.container}>
      <Link to={'/'}>
        <button>Main page</button>
      </Link>
      <h2>Top Scores</h2>
      <ul>
        {records.map((record, index) => (
          <li key={index}>
            <div>
              Name: <span>{record.name}</span>
            </div>
            <div>
              Record: <span>{getTime(record.record)}</span>
            </div>
            <div>
              {`Date: `}
              {DateTime.fromISO(record.date).toFormat('yyyy-MM-dd HH:mm:ss')}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Records;
