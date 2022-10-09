import React, { useState, useEffect } from 'react';
import styles from '../styles/ScreeningForm.module.css';

const ScreeningForm = ({ setShowForm, formData, setFormData, setAlert }) => {
  const {
    proofOfVaccine,
    firstName,
    lastName,
    dateOfVisit,
    CallToIsolate,
    olderAndExpSym,
    covidPositive,
    positiveRapid,
    anySymptoms,
  } = formData.screeningData;

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
    'Decreased/loss of taste or smell',
    'Chills',
    'Headache',
    'Unexplained fatigue, malaise or muscle aches',
    'Nausea, vomiting, diarrhea or abdominal pain',
    'Pink eye (conjunctivitis)',
    'Runny nose or nasal congestion',
  ];

  const [checkedSymptoms, setCheckedSymptoms] = useState([]);
  const [checkOptions, setCheckOptions] = useState(0);
  const [displayErr, setDisplayErr] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const checkData = () => {
    if (
      anySymptoms == '' ||
      (anySymptoms != 'no' && anySymptoms != '' && checkOptions < 1) ||
      proofOfVaccine == '' ||
      (proofOfVaccine != null && proofOfVaccine.vaccineQuantity == '') ||
      (proofOfVaccine != null && proofOfVaccine.vaccineQuantity > 6) ||
      (proofOfVaccine != null && proofOfVaccine.certificateFile == '') ||
      firstName == '' ||
      lastName == '' ||
      dateOfVisit == '' ||
      CallToIsolate == '' ||
      olderAndExpSym == '' ||
      covidPositive == '' ||
      positiveRapid == '' ||
      anySymptoms == undefined ||
      (anySymptoms != 'no' && anySymptoms != '' && checkedSymptoms.length < 1)
    ) {
      return setSubmitted(false);
    }

    setShowForm(2);
  };

  function handleSubmit(e) {
    e.preventDefault();

    // If symptoms exist, add them to the form on submission
    if (checkedSymptoms.length >= 1) {
      setFormData({
        ...formData,
        screeningData: {
          ...formData.screeningData,
          anySymptoms: checkedSymptoms,
        },
      });
    }

    setDisplayErr(true);

    // Switch Forms
    setSubmitted(true);
  }

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

  const handleSymptoms = (e, symptom, symId) => {
    if (e.target.checked) {
      setCheckedSymptoms([...checkedSymptoms, { symptom, id: symId }]);
      setCheckOptions(checkOptions + 1);
    } else {
      setCheckedSymptoms(checkedSymptoms.filter((sym) => sym.id !== symId));
      setCheckOptions(checkOptions - 1);
    }
  };

  useEffect(() => {
    submitted ? checkData() : '';
  });

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
      <div className={styles.inputWrapper}>
        <label htmlFor="firstName">First Name</label>
        <input
          onChange={(e) => {
            setFormData({
              ...formData,
              screeningData: {
                ...formData.screeningData,
                [e.target.name]: e.target.value.trim(),
              },
            });
            setDisplayErr(false);
          }}
          type="text"
          id="firstName"
          name="firstName"
          placeholder="John"
        />
        {displayErr && firstName == '' && (
          <p className={styles.errorMsg}>Missing Data</p>
        )}
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="lastName">Last Name</label>
        <input
          onChange={(e) => {
            setFormData({
              ...formData,
              screeningData: {
                ...formData.screeningData,
                [e.target.name]: e.target.value.trim(),
              },
            });
            setDisplayErr(false);
          }}
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Doe"
        />
        {displayErr && lastName == '' && (
          <p className={styles.errorMsg}>Missing Data</p>
        )}
      </div>
      <div className={`${styles.inputWrapper} ${styles.dateOfVisit}`}>
        <label style={{ width: '340px' }}>Date of visit </label>
        <input
          placeholder="Date"
          type="date"
          onChange={(e) => {
            setFormData({
              ...formData,
              screeningData: {
                ...formData.screeningData,
                [e.target.name]: e.target.value,
              },
            });
            setDisplayErr(false);
          }}
          id="dateOfVisit"
          name="dateOfVisit"
        />
        {displayErr && dateOfVisit == '' && (
          <p className={styles.errorMsg}>Missing Data</p>
        )}
      </div>
      <hr className={styles.hr}></hr>
      <p className={styles.sectionHeader}>COVID-19 screening questions</p>
      <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
        <label>
          1. Do you have your proof of vaccination (if you are vaccinated)?
        </label>
        <div>
          <input
            onChange={(e) => {
              displayItems(e.target.id, 0);
              setFormData({
                ...formData,
                screeningData: {
                  ...formData.screeningData,
                  [e.target.name]: e.target.checked
                    ? { vaccineQuantity: '', certificateFile: '' }
                    : '',
                },
              });
              setDisplayErr(false);
            }}
            name="proofOfVaccine"
            id="yes"
            className={`yes yesVaccine ${styles.yesCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="yes">Yes</label>
          <input
            onChange={(e) => {
              displayItems(e.target.id, 0);
              setFormData({
                ...formData,
                screeningData: {
                  ...formData.screeningData,
                  [e.target.name]: e.target.checked ? 'no' : '',
                },
              });
              setDisplayErr(false);
            }}
            name="proofOfVaccine"
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
              onChange={(e) => {
                displayItems(e.target.id, 0);
                setFormData({
                  ...formData,
                  screeningData: {
                    ...formData.screeningData,
                    [e.target.name]: {
                      ...proofOfVaccine,
                      vaccineQuantity: e.target.value < 1 ? '' : e.target.value,
                    },
                  },
                });
                setDisplayErr(false);
              }}
              className={styles.vaccineQuantity}
              type="number"
              id="vaccineQuantity"
              name="proofOfVaccine"
              placeholder="2"
            />
            <br></br>
            <label>Please attach vaccine certificate</label>
            <input
              onChange={(e) => {
                displayItems(e.target.id, 0);
                setFormData({
                  ...formData,
                  screeningData: {
                    ...formData.screeningData,
                    [e.target.name]: {
                      ...proofOfVaccine,
                      certificateFile: e.target.value,
                    },
                  },
                });
                setDisplayErr(false);
              }}
              name="proofOfVaccine"
              type="file"
              accept="application/pdf"
            />
          </div>
        )}
        {displayErr && proofOfVaccine == '' && (
          <p className={styles.errorMsg}>Missing Data</p>
        )}
        {proofOfVaccine != null
          ? displayErr &&
            proofOfVaccine.vaccineQuantity == '' && (
              <p className={styles.errorMsg}>Invalid Vaccine Quantity</p>
            )
          : ''}
        {proofOfVaccine != null
          ? displayErr &&
            proofOfVaccine.vaccineQuantity > 6 && (
              <p className={styles.errorMsg}>Invalid Vaccine Quantity</p>
            )
          : ''}
        {proofOfVaccine != null
          ? displayErr &&
            proofOfVaccine.certificateFile == '' && (
              <p className={styles.errorMsg}>Missing PDF File</p>
            )
          : ''}
      </div>
      <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
        <label>
          2. Did you have a positive rapid test within the past 24 hrs?
        </label>
        <div>
          <input
            onChange={(e) => {
              switchCheck(e.target, 1);
              setFormData({
                ...formData,
                screeningData: {
                  ...formData.screeningData,
                  [e.target.name]: e.target.checked ? 'yes' : '',
                },
              });
              setDisplayErr(false);
            }}
            id="yesRapid"
            name="positiveRapid"
            className={`yes rapid ${styles.yesCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="yesRapid">Yes</label>
          <input
            id="noRapid"
            onChange={(e) => {
              switchCheck(e.target, 1);
              setFormData({
                ...formData,
                screeningData: {
                  ...formData.screeningData,
                  [e.target.name]: e.target.checked ? 'no' : '',
                },
              });
              setDisplayErr(false);
            }}
            name="positiveRapid"
            className={`no rapid ${styles.noCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="noRapid">No</label>
        </div>
        {displayErr && positiveRapid == '' && (
          <p className={styles.errorMsg}>Missing Data</p>
        )}
      </div>
      <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
        <label>
          3. Did you receive a call after traveling or from local Health Care
          Provider or Public Health to self-isolate due to a potential exposure?
        </label>
        <div>
          <input
            onChange={(e) => {
              switchCheck(e.target, 2);
              setFormData({
                ...formData,
                screeningData: {
                  ...formData.screeningData,
                  [e.target.name]: e.target.checked ? 'yes' : '',
                },
              });
              setDisplayErr(false);
            }}
            name="CallToIsolate"
            id="yesTravel"
            className={`yes travel ${styles.yesCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="yesTravel">Yes</label>
          <input
            onChange={(e) => {
              switchCheck(e.target, 2);
              setFormData({
                ...formData,
                screeningData: {
                  ...formData.screeningData,
                  [e.target.name]: e.target.checked ? 'no' : '',
                },
              });
              setDisplayErr(false);
            }}
            name="CallToIsolate"
            id="noTravel"
            className={`no travel ${styles.noCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="noTravel">No</label>
        </div>
        {displayErr && CallToIsolate == '' && (
          <p className={styles.errorMsg}>Missing Data</p>
        )}
      </div>
      <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
        <label>4. Are you experiencing any symptoms?</label>
        <div>
          <input
            onChange={(e) => {
              displayItems(e.target.id, 1);
              setFormData({
                ...formData,
                screeningData: {
                  ...formData.screeningData,
                  [e.target.name]: e.target.checked
                    ? checkedSymptoms
                    : setCheckedSymptoms([]),
                },
              });
              setDisplayErr(false);
            }}
            name="anySymptoms"
            id="yesSymptoms"
            className={`yesSymptoms ${styles.yesCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="yesSymptoms">Yes</label>
          <input
            onChange={(e) => {
              displayItems(e.target.id, 1);
              setFormData({
                ...formData,
                screeningData: {
                  ...formData.screeningData,
                  // Check that its checked, if not, then leave it blank
                  [e.target.name]: e.target.checked
                    ? 'no'
                    : setCheckedSymptoms([]),
                },
              });
              setDisplayErr(false);
            }}
            id="noSymptoms"
            className={`noSymptoms ${styles.noCheckbox}`}
            type="checkbox"
            name="anySymptoms"
          />
          <label htmlFor="noSymptoms">No</label>
          {showSymptoms && (
            <div className={styles.symptomsList}>
              <span className={styles.symptomHeader}>
                Please check all that is applicable
              </span>
              {symptoms.map((symptom, i) => {
                return (
                  <div key={i}>
                    <input
                      id={symptom}
                      name="symptomOption"
                      onChange={(e) => {
                        handleSymptoms(e, symptom, i);
                        setDisplayErr(false);
                      }}
                      className={styles.yesCheckbox}
                      type="checkbox"
                    />
                    <label htmlFor={symptom}>{symptom}</label>
                  </div>
                );
              })}
            </div>
          )}
          {displayErr && anySymptoms == '' ? (
            <p className={styles.errorMsg}>Missing Data</p>
          ) : displayErr &&
            anySymptoms != 'no' &&
            anySymptoms != '' &&
            checkOptions < 1 ? (
            <p className={styles.errorMsg}>Missing Data</p>
          ) : displayErr && anySymptoms == undefined ? (
            <p className={styles.errorMsg}>Missing Data</p>
          ) : (
            ''
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
            onChange={(e) => {
              switchCheck(e.target, 3);
              setFormData({
                ...formData,
                screeningData: {
                  ...formData.screeningData,
                  [e.target.name]: e.target.checked ? 'yes' : '',
                },
              });
              setDisplayErr(false);
            }}
            name="covidPositive"
            id="yesPositive"
            className={`yes positive ${styles.yesCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="yesPositive">Yes</label>
          <input
            onChange={(e) => {
              switchCheck(e.target, 3);
              setFormData({
                ...formData,
                screeningData: {
                  ...formData.screeningData,
                  [e.target.name]: e.target.checked ? 'no' : '',
                },
              });
              setDisplayErr(false);
            }}
            id="noPositive"
            name="covidPositive"
            className={`no positive ${styles.noCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="noPositive">No</label>
        </div>
        {displayErr && covidPositive == '' && (
          <p className={styles.errorMsg}>Missing Data</p>
        )}
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
            onChange={(e) => {
              switchCheck(e.target, 4);
              setFormData({
                ...formData,
                screeningData: {
                  ...formData.screeningData,
                  [e.target.name]: e.target.checked ? 'yes' : '',
                },
              });
              setDisplayErr(false);
            }}
            id="yesOlder"
            name="olderAndExpSym"
            className={`yes older ${styles.yesCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="yesOlder">Yes</label>
          <input
            onChange={(e) => {
              switchCheck(e.target, 4);
              setFormData({
                ...formData,
                screeningData: {
                  ...formData.screeningData,
                  [e.target.name]: e.target.checked ? 'no' : '',
                },
              });
              setDisplayErr(false);
            }}
            id="noOlder"
            name="olderAndExpSym"
            className={`no older ${styles.noCheckbox}`}
            type="checkbox"
          />
          <label htmlFor="noOlder">No</label>
        </div>
        {displayErr && olderAndExpSym == '' && (
          <p className={styles.errorMsg}>Missing Data</p>
        )}
      </div>
      <div style={{ position: 'relative' }}>
        {(displayErr && anySymptoms == '') ||
        (displayErr &&
          anySymptoms != 'no' &&
          anySymptoms != '' &&
          checkOptions < 1) ||
        (displayErr && proofOfVaccine == '') ||
        (displayErr &&
          proofOfVaccine != null &&
          displayErr &&
          proofOfVaccine.vaccineQuantity == '') ||
        (proofOfVaccine != null &&
          displayErr &&
          proofOfVaccine.vaccineQuantity > 6) ||
        (proofOfVaccine != null &&
          displayErr &&
          proofOfVaccine.certificateFile == '') ||
        (displayErr && firstName == '') ||
        (displayErr && lastName == '') ||
        (displayErr && dateOfVisit == '') ||
        (displayErr && CallToIsolate == '') ||
        (displayErr && olderAndExpSym == '') ||
        (displayErr && covidPositive == '') ||
        (displayErr && positiveRapid == '') ||
        (displayErr && anySymptoms == undefined) ? (
          <p className={styles.mainErrorMsg}>Please fill all missing Data</p>
        ) : (
          ''
        )}
        <button className={styles.submitBtn} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ScreeningForm;
