import { getTime } from '../../misc';
import { DateTime } from 'luxon';
import styles from './styles.module.css';


interface Record {
  name: string;
  record: number;
  date: string;
}

const TopScores = ({ records }: { records:Record[] }) => {


  return (
    <>
      {records === null ? (
        <p>loading...</p>
      ) : (
        <div className={styles.container}>
          <ul>
            {records.map((record, index) => (
              <li key={index}>
                <div className={styles.name}>{record.name}</div>
                <div className={styles.record}>
                  Record: <span>{getTime(record.record)}</span>
                </div>
                <div>
                  {`Date: `}
                  {DateTime.fromISO(record.date).toFormat(
                    'yyyy-MM-dd HH:mm:ss'
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default TopScores;
