import React from 'react';
import styles from '../styles/NextStep.module.css';
import axios from 'axios';
import { server } from '../utils/config.js';
import { useRouter } from 'next/router';

const RegistrationForm = ({ formData }) => {
  const uploadPatient = async () => {
    try {
      await axios.post(`${server}/api/patients`, formData);
    } catch (err) {
      console.log(err);
    }
  };

  uploadPatient();

  const router = useRouter();
  setTimeout(() => {
    router.push('/form-completed');
  }, 2000);

  return (
    <div>
      <div className={styles.container}>
        Thank you for filling the forms, uploading data...
      </div>
    </div>
  );
};

export default RegistrationForm;
