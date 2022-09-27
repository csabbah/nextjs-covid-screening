import React, { useState } from 'react';
import styles from '../styles/ScreeningForm.module.css';

const ScreeningForm = ({ setShowForm, formData }) => {
  const [vaccineProof, setVaccineProof] = useState(false);
  const [showSymptoms, setShowSymptoms] = useState(false);

  const symptoms = [
    'Fever',
    'New onset of cough',
    'Worsening chronic cough',
    'Difficulty breathing',
    'Shortness of breath',
    'Sore throat',
    'Difficulty swallowing',
    'Decreased or loss of sense of taste or smell',
    'Chills',
    'Headache',
    'Unexplained fatigue, malaise or muscle aches',
    'Nausea, vomiting, diarrhea or abdominal pain',
    'Pink eye (conjunctivitis)',
    'Runny nose or nasal congestion without other known cause',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save data to formData state then display next form

    setShowForm(2);
  };

  const displayItems = (id, index) => {
    if (index == 0) {
      const noEl = document.querySelector('.noVaccine');
      const yesEl = document.querySelector('.yesVaccine');
      if (id == 'yes' && yesEl.checked) {
        setVaccineProof(true);
        noEl.checked = false;
      } else if (id == 'yes' && !yesEl.checked) {
        setVaccineProof(false);
      }
      if (id == 'no') {
        setVaccineProof(false);
        yesEl.checked = false;
      }
    } else {
      const noEl = document.querySelector('.noSymptoms');
      const yesEl = document.querySelector('.yesSymptoms');
      if (id == 'yesSymptoms' && yesEl.checked) {
        setShowSymptoms(true);
        noEl.checked = false;
      } else if (id == 'yesSymptoms' && !yesEl.checked) {
        setShowSymptoms(false);
      }

      if (id == 'noSymptoms') {
        setShowSymptoms(false);
        yesEl.checked = false;
      }
    }
  };

  const switchCheck = (e, index) => {
    let checkBoxAction = e.className.split(' ')[0];
    let checkBoxSection = e.className.split(' ')[1];
    console.log(checkBoxSection, checkBoxAction, index);
    if (
      checkBoxAction == 'yes' &&
      document.querySelector(`.${checkBoxSection}`).checked
    ) {
      document.querySelectorAll(`.no`)[index].checked = false;
    }

    if (
      checkBoxAction == 'no' &&
      document.querySelector(`.${checkBoxSection}`).checked
    ) {
      document.querySelectorAll(`.yes`)[index].checked = false;
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
      <div className={styles.inputWrapper}>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" placeholder="John" />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" placeholder="Doe" />
      </div>
      <div className={`${styles.inputWrapper} ${styles.dateOfVisit}`}>
        <label>Date of Visit</label>
        <input type="date" id="dateOfVisit" name="dateOfVisit" />
      </div>
      <hr className={styles.hr}></hr>
      <p className={styles.sectionHeader}>COVID-19 screening questions</p>
      <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
        <label>
          1. Do you have your proof of vaccination (if you are vaccinated)?
        </label>
        <div>
          <input
            onChange={(e) => displayItems(e.target.id, 0)}
            id="yes"
            className={`yes yesVaccine ${styles.yesCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="yes">Yes</label>
          <input
            onChange={(e) => displayItems(e.target.id, 0)}
            id="no"
            className={`no noVaccine ${styles.noCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="no">No</label>
        </div>
        {vaccineProof && (
          <div>
            <label>How many?</label>
            <input
              className={styles.vaccineQuantity}
              type="number"
              id="vaccineQuantity"
              name="vaccineQuantity"
              placeholder="2"
            />
            <br></br>
            <label>Please attach vaccine certificate</label>
            <input type="file" />
          </div>
        )}
      </div>
      <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
        <label>
          2. Did you have a positive rapid test within the past 24 hrs?
        </label>
        <div>
          <input
            onChange={(e) => switchCheck(e.target, 1)}
            id="yesRapid"
            className={`yes rapid ${styles.yesCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="yesRapid">Yes</label>
          <input
            id="noRapid"
            onChange={(e) => switchCheck(e.target, 1)}
            className={`no rapid ${styles.noCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="noRapid">No</label>
        </div>
      </div>
      <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
        <label>
          3. Did you receive a call after traveling or from local Health Care
          Provider or Public Health to self-isolate due to a potential exposure?
        </label>
        <div>
          <input
            onChange={(e) => switchCheck(e.target, 2)}
            id="yesTravel"
            className={`yes travel ${styles.yesCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="yesTravel">Yes</label>
          <input
            onChange={(e) => switchCheck(e.target, 2)}
            id="noTravel"
            className={`no travel ${styles.noCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="noTravel">No</label>
        </div>
      </div>
      <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
        <label>4. Are you experiencing any symptoms?</label>
        <div>
          <input
            onChange={(e) => displayItems(e.target.id, 1)}
            id="yesSymptoms"
            className={`yesSymptoms ${styles.yesCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="yesSymptoms">Yes</label>
          <input
            onChange={(e) => displayItems(e.target.id, 1)}
            id="noSymptoms"
            className={`noSymptoms ${styles.noCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="noSymptoms">No</label>
          {showSymptoms && (
            <div className={styles.symptomsList}>
              <span className={styles.symptomHeader}>
                Please all check that is applicable
              </span>
              {symptoms.map((symptom) => {
                return (
                  <div>
                    <input
                      id={symptom}
                      name={symptom}
                      className={styles.yesCheckbox}
                      type="checkbox"
                    />
                    <label htmlFor={symptom}>{symptom}</label>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
        <label>
          5. Did you test positive for COVID-19 in the past 10 days by doing
          rapid antigen test or PCR test, had close contact with anyone with a
          confirmed case of COVID- 19, close contact with someone who is
          Currently in isolation, or have you been in close contact with anyone
          who has these symptoms?
        </label>
        <div>
          <input
            onChange={(e) => switchCheck(e.target, 3)}
            id="yesPositive"
            className={`yes positive ${styles.yesCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="yesPositive">Yes</label>
          <input
            onChange={(e) => switchCheck(e.target, 3)}
            id="noPositive"
            className={`no positive ${styles.noCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="noPositive">No</label>
        </div>
      </div>
      <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
        <label>
          6. If the person is 70 years of age or older, are they experiencing
          any of the following symptoms:{' '}
          <span className={styles.emphasize}>
            delirium, unexplained or increased number of falls, acute functional
            decline, or worsening of chronic conditions?
          </span>
        </label>
        <div>
          <input
            onChange={(e) => switchCheck(e.target, 4)}
            id="yesOlder"
            className={`yes older ${styles.yesCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="yesOlder">Yes</label>
          <input
            onChange={(e) => switchCheck(e.target, 4)}
            id="noOlder"
            className={`no older ${styles.noCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="noOlder">No</label>
        </div>
      </div>
      <button className={styles.submitBtn} type="submit">
        Submit
      </button>
    </form>
  );
};

export default ScreeningForm;
