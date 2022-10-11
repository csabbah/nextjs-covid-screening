import React from 'react';
import styles from '../styles/NextStep.module.css';
import axios from 'axios';
import { server } from '../utils/config.js';
import { useRouter } from 'next/router';

const RegistrationForm = ({ formData }) => {
  const router = useRouter();

  const uploadPatient = async () => {
    try {
      await axios.post(`${server}/api/patients`, formData);
      router.push('/form-completed');
    } catch (err) {
      console.log(err);
    }
  };

  // setState from previous form (RegistryForm/line 92) is one step behind, thus, we make sure
  // to only upload the most recent data (which does not include 'data:image')
  if (!formData.registryData.signature.includes('data:image')) {
    uploadPatient();
  }

  return (
    <div>
      <div className={styles.container}>Uploading data...</div>
    </div>
  );
};

export default RegistrationForm;
