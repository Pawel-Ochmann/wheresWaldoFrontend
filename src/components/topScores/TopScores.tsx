import { getTime } from '../../misc';
import { DateTime } from 'luxon';


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
        <div>
          <ul>
            {records.map((record, index) => (
              <li key={index}>
                <div>Name: {record.name}</div>
                <div>Record: {getTime(record.record)}</div>
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
