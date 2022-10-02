import React from 'react';
import styles from '../styles/NextStep.module.css';

const RegistrationForm = ({ formData }) => {
  console.log(true, formData);
  return (
    <div className={styles.container}>Thank you for filling the form.</div>
  );
};

export default RegistrationForm;
