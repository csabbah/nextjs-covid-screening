import styles from '../styles/Navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';

import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  const endpointName = router.pathname;

  return (
    <div className={styles.container}>
      <p className={styles.header}>Registration and Screening</p>
      {/* <Link href="/" passHref>
        <li
          style={{ color: endpointName == '/' ? 'black' : 'red' }}
          className={`${styles.listItem}`}
        >
          Home
        </li>
      </Link>
      <Link href="/admin" passHref>
        <li
          style={{ color: endpointName == '/admin' ? 'black' : 'red' }}
          className={`${styles.listItem}`}
        >
          Admin
        </li>
      </Link> */}
    </div>
  );
};

export default Navbar;
