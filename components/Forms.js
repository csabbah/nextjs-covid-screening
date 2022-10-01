import React, { useState } from 'react';
import styles from '../styles/Forms.module.css';
import ScreeningForm from './ScreeningForm';
import RegistryForm from './RegistryForm';

const Forms = () => {
  const [showForm, setShowForm] = useState(1);
  const [formData, setFormData] = useState({
    screeningData: {
      firstName: '',
      lastName: '',
      dateOfVisit: '',
      proofOfVaccine: null,
      positiveRapid: '',
      CallToIsolate: '',
      anySymptoms: null,
      covidPositive: '',
      olderAndExpSym: '',
    },
    registryData: {
      fullName: '',
      age: '',
      sex: '',
      address: '',
      DOB: '',
      homeNum: '',
      workNum: '',
      cellNum: '',
      email: '',
      occupation: '',
      maritalStat: '',
      reasonForConsult: '',
      hearAboutUs: '',
      emergencyContact: {
        fullName: '',
        relationship: '',
        address: '',
        phoneNum: '',
        workNum: '',
        cellNum: '',
      },
      medicalHistory: {
        height: '',
        weight: '',
        lastPhysical: '',
        smoker: null,
        alcoholDrinker: null,
        previousCosmetics: '',
        activeMedications: '',
        activeHerbalSups: '',
        medicalConditions: null,
        allergies: null,
        staph: null,
      },
      signature: '',
      date: '',
    },
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
