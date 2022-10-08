import React from 'react';
import styles from '../styles/FormCompleted.module.css';

const FormCompleted = () => {
  return (
    <div>
      <div className={styles.container}>
        Your form has successfully submitted!
      </div>
    </div>
  );
};

export default FormCompleted;
