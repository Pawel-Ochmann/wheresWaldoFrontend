import React from 'react';
import {useLocation} from 'react-router';

interface Record {
  name: string;
  record: number;
  date: Date;
}

interface Props {
  records: Record[];
}

const Records: React.FC<Props> = () => {
  const location = useLocation();
  const records:Record[] = location.state.records;

  return (
    <div>
      <h2>Records</h2>
      <ul>
        {records.map((record, index) => (
          <li key={index}>
            <div>Name: {record.name}</div>
            <div>Record: {record.record}</div>
            <div>Date: {record.date.toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Records;
