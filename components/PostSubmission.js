import React from 'react';
import styles from '../styles/NextStep.module.css';
import axios from 'axios';
import { server } from '../utils/config.js';
import { useRouter } from 'next/router';

const RegistrationForm = ({ formData, setFormData }) => {
  const router = useRouter();

  const uploadPatient = async () => {
    const data = new FormData();
    data.append('file', formData.registryData.signature);
    data.append('upload_preset', 'uploads');

    try {
      const uploadRes = await axios.post(
        // csabbah is our Cloud name (Can be found in the Cloudinary/Dashboard)
        'https://api.cloudinary.com/v1_1/csabbah/image/upload',
        data
      );
      // Extract the cloud link (that was generated above)
      const { url } = uploadRes.data;

      console.log('yrdy');
      // Update the formData and include the newly generated cloudinary link for the signature
      setFormData({
        ...formData,
        registryData: {
          ...formData.registryData,
          signature: url,
        },
      });

      await axios.post(`${server}/api/patients`, formData);

      router.push('/form-completed');
    } catch (err) {
      console.log(err);
    }
  };

  uploadPatient();

  return (
    <div>
      <div className={styles.container}>Uploading...</div>
    </div>
  );
};

export default RegistrationForm;
