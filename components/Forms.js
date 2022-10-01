import React, { useState } from 'react';
import styles from '../styles/Forms.module.css';
import ScreeningForm from './ScreeningForm';
import RegistryForm from './RegistryForm';

const Forms = () => {
  const [showForm, setShowForm] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfVisit: '',
    proofOfVaccine: { answer: '', vaccineQuantity: '', certificateFile: '' },
    positiveRapid: '',
    CallToIsolate: '',
    anySymptoms: null,
    covidPositive: '',
    olderAndExpSym: '',
  });

  return (
    <div className={styles.container}>
      {showForm == 1 ? (
        <ScreeningForm
          setShowForm={setShowForm}
          setFormData={setFormData}
          formData={formData}
        />
      ) : (
        <RegistryForm setFormData={setFormData} formData={formData} />
      )}
    </div>
  );
};

export default Forms;
