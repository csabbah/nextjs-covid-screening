import React from 'react';
import styles from '../styles/NextStep.module.css';
import axios from 'axios';

const RegistrationForm = ({ formData }) => {
  const handleCreate = async (data) => {
    try {
      let res = await axios.post(`http://localhost:3000/api/patients`, {
        data,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  handleCreate(formData);

  return (
    <div className={styles.container}>Thank you for filling the form.</div>
  );
};

export default RegistrationForm;
