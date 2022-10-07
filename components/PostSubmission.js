import React from 'react';
import styles from '../styles/NextStep.module.css';
import axios from 'axios';

const RegistrationForm = ({ formData }) => {
  const handleCreate = async () => {
    console.log(formData, 'tesu');

    try {
      await axios.post(`http://localhost:3000/api/patients`, formData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className={styles.container}>Thank you for filling the form.</div>
      <button onClick={() => handleCreate()}>Upload</button>
    </div>
  );
};

export default RegistrationForm;
