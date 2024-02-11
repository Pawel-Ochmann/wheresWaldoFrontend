import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <div>
      <p>
        made by Paweł Ochmann{' '}
        <a href=''>
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </p>
    </div>
  );
}
