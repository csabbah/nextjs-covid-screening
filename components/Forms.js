import React, { useState } from 'react';
import styles from '../styles/Forms.module.css';
import ScreeningForm from './ScreeningForm';
import RegistryForm from './RegistryForm';

const Forms = () => {
  const [showForm, setShowForm] = useState(1);
  const [formData, setFormData] = useState({});

  return (
    <div className={styles.container}>
      {showForm == 1 ? (
        <ScreeningForm setShowForm={setShowForm} formData={formData} />
      ) : (
        <RegistryForm formData={formData} />
      )}
    </div>
  );
};

export default Forms;
