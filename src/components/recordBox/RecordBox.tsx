import { Link } from 'react-router-dom';
import { getTime } from '../../misc';
import styles from './styles.module.css';

export default function recordBox({ record }: { record: number }) {
  return (
    <div className={styles.box}>
      <p>{`Your record is ${getTime(record)}`}</p>
      <button>Save the record</button>
      <Link to={'/'}><button>Go back to main page</button></Link>
    </div>
  );
}
