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
      <p className={styles.header}>Screening and Registration</p>
    </div>
  );
};

export default Navbar;
