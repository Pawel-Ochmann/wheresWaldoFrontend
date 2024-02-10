import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { getTime } from '../../misc';
import {DateTime} from 'luxon';

interface Record {
  name: string;
  record: number;
  date: string;
}

interface Props {
  records: Record[];
}


const Records: React.FC<Props> = () => {
  const location = useLocation();
  const records: Record[] = location.state.records;

  return (
    <div>
      <Link to={'/'}>
        <button>Main page</button>
      </Link>
      <h2 onClick={()=>{console.log(records[0])}}>Records</h2>
      <ul>
        {records.map((record, index) => (
          <li key={index}>
            <div>Name: {record.name}</div>
            <div>Record: {getTime(record.record)}</div>
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
