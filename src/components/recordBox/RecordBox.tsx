import { Link } from 'react-router-dom';
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

  function saveHandler(e: React.MouseEvent<HTMLButtonElement>):void {
    e.preventDefault();
    const recordToSave = localStorage.getItem('record');
    if (recordToSave) {
      fetch(`/api/games/${gameId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          record: recordToSave,
          playerName: playerName.trim(),
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Handle success
          console.log('Record saved successfully');
          const data = response.json();
          const { records } = data;
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
      <p>{`Your record is ${getTime(record)}`}</p>
      {position > 10 ? (
        <p>Your position is out of best 10, try again!</p>
      ) : (
        <div>
          <p>Its is top {position} best record!</p>
          <p>Do you want to save your record?</p>
          <input
            type='text'
            placeholder='Enter your name'
            value={playerName}
            onChange={handleInputChange}
          />
          <button onClick={saveHandler} disabled={!playerName.trim()}>
            Save the record
          </button>
          <Link to={'/'}>
            <button>Go back to main page</button>
          </Link>
        </div>
      )}
    </div>
  );
}
