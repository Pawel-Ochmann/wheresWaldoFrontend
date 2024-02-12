import { Link, useNavigate } from 'react-router-dom';
import { getTime } from '../../misc';
import styles from './styles.module.css';
import React, { useState } from 'react';

export default function recordBox({
  record,
  gameId,
  position,
}: {
  record: number;
  gameId: string;
  position: number;
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

    type Record = {
      name: string;
      record: number;
      date: Date;
    };
    type Data = { records: Record[] };

  function saveHandler(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    const recordToSave = localStorage.getItem('record');
    if (recordToSave) {

      console.log('record and player name', recordToSave, playerName.trim())
      fetch(`http://localhost:3000/games/${gameId}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          record: recordToSave, // Assuming recordToSave is a number
          playerName: playerName.trim(),
        })
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Handle success
          console.log('Record saved successfully');

          return response.json() as Promise<Data>;
        })
        .then((data) => {
          const { records } = data;
          navigate(`/games/${gameId}/records`, { state: { records } });
        })
        .catch((error) => {
          // Handle error
          console.error('There was a problem saving the record:', error);
        });
    } else {
      console.error('Record not found in localStorage');
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setPlayerName(event.target.value);
  }

  return (
    <div className={styles.box}>
      <p>Your record is <span>{`${getTime(record)}`}</span></p>
      {position > 10 ? (
        <p>Your position is out of best 10, try again!</p>
      ) : (
        <div>
          <p>Its is top <span>{position}</span> best record!</p>
          <p>Do you want to save your record?</p>
          <div className={styles.formContainer}>
            <input
              type='text'
              placeholder='Enter your name'
              value={playerName}
              onChange={handleInputChange}
            />
            <button className={styles.saveButton} onClick={saveHandler} disabled={!playerName.trim()}>
              Save the record
            </button>
            <Link to={'/'}>
              <button>Go back to main page</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
