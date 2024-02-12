import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import styles from './styles.module.css';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <p>
        made by Paweł Ochmann{' '}
        <a href=''>
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </p>
    </div>
  );
}
