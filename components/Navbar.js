import styles from '../styles/Navbar.module.css';

import { useRouter } from 'next/router';

const Navbar = ({ header, boolean }) => {
  const router = useRouter();
  const endpointName = router.pathname;

  return (
    <div
      style={boolean ? { position: 'absolute' } : {}}
      className={`${styles.container}`}
    >
      <p className={styles.header}>{header}</p>
    </div>
  );
};

export default Navbar;
