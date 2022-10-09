import React, { useState, useEffect } from 'react';
import styles from '../styles/RegistryForm.module.css';
import { useRouter } from 'next/router';
import SignatureCanvas from 'react-signature-canvas';

const RegistryForm = ({ formData, setFormData, setShowForm, setAlert }) => {
  const [alcohol, setAlcohol] = useState(false);
  const [smoke, setSmoke] = useState(false);
  const [allergies, setAllergy] = useState(false);
  const [staph, setStaph] = useState(false);

  const medicalConditions = [
    'Angina/chest pain',
    'Anemia',
    'Arthritis',
    'Depression',
    'Asthma',
    'Psychiatric disorder',
    'Anxiety',
    'Cancer',
    'Seizures',
    'Heart disease',
    'hyroid disease',
    'High blood pressure',
    'Lung disease',
    'Diabetes type I Type II',
    'Shortness of breath',
    'Colitis/ IBS',
    'Ankle swelling',
    'Hepatitis A/B/C',
    'Bleeding disorder',
    'HIV/AIDS',
    'Blood clots',
    'Anesthesia problems',
    'Weight loss',
    'Breast Cancer',
    'Kidney disease',
  ];

  const [checkedConditions, setCheckedConditions] = useState([]);
  const handleMedicals = (e, condition, ID) => {
    if (e.target.checked) {
      setCheckedConditions([...checkedConditions, { condition, id: ID }]);
    } else {
      setCheckedConditions(checkedConditions.filter((cond) => cond.id !== ID));
    }
  };

  const [otherCond, setOtherCond] = useState('');

  const checkData = () => {
    if (
      formData.registryData.date == '' ||
      sigEmpty ||
      formData.registryData.medicalHistory.allergies == null ||
      formData.registryData.medicalHistory.staph == null ||
      formData.registryData.medicalHistory.alcoholDrinker == null ||
      formData.registryData.medicalHistory.smoker == null ||
      formData.registryData.medicalHistory.lastPhysical == '' ||
      formData.registryData.medicalHistory.weight > 1000 ||
      formData.registryData.medicalHistory.weight < 1 ||
      formData.registryData.medicalHistory.height > 1000 ||
      formData.registryData.medicalHistory.height < 10 ||
      formData.registryData.emergencyContact.cellNum == '' ||
      formData.registryData.emergencyContact.workNum == '' ||
      formData.registryData.emergencyContact.phoneNum == '' ||
      formData.registryData.emergencyContact.address == '' ||
      formData.registryData.emergencyContact.relationship == '' ||
      formData.registryData.emergencyContact.fullName == '' ||
      formData.registryData.hearAboutUs == '' ||
      formData.registryData.reasonForConsult == '' ||
      formData.registryData.maritalStat == '' ||
      formData.registryData.occupation == '' ||
      formData.registryData.email == '' ||
      formData.registryData.cellNum == '' ||
      formData.registryData.workNum == '' ||
      formData.registryData.homeNum == '' ||
      formData.registryData.DOB == '' ||
      formData.registryData.address == '' ||
      formData.registryData.sex == '' ||
      formData.registryData.age < 1 ||
      formData.registryData.age > 150 ||
      formData.registryData.fullName == ''
    ) {
      return setSubmitted(true);
    }
    if (
      formData.registryData.medicalHistory.staph != null &&
      formData.registryData.medicalHistory.staph != 'no' &&
      formData.registryData.medicalHistory.staph.length < 1
    ) {
      return setSubmitted(true);
    }
    if (
      formData.registryData.medicalHistory.allergies != null &&
      formData.registryData.medicalHistory.allergies != 'no' &&
      formData.registryData.medicalHistory.allergies.length < 1
    ) {
      return setSubmitted(true);
    }
    if (
      formData.registryData.medicalHistory.alcoholDrinker != null &&
      formData.registryData.medicalHistory.alcoholDrinker != 'no'
    ) {
      if (
        formData.registryData.medicalHistory.alcoholDrinker.howManyDrinks < 1 ||
        formData.registryData.medicalHistory.alcoholDrinker.howManyDrinks > 100
      ) {
        return setSubmitted(true);
      }
    }
    if (
      formData.registryData.medicalHistory.smoker != null &&
      formData.registryData.medicalHistory.smoker != 'no'
    ) {
      if (
        formData.registryData.medicalHistory.smoker.packsPerDay < 1 ||
        formData.registryData.medicalHistory.smoker.packsPerDay > 50 ||
        formData.registryData.medicalHistory.smoker.howLong == ''
      ) {
        return setSubmitted(true);
      }
    }
    setShowForm(3);
  };

  const [submitted, setSubmitted] = useState(false);
  const handleSecondSubmit = (e) => {
    e.preventDefault();

    // Save data to formData state, create User model then redirect to a different route saying submission completed!

    setFormData({
      ...formData,
      registryData: {
        ...formData.registryData,
        medicalHistory: {
          ...formData.registryData.medicalHistory,
          medicalConditions: {
            symptoms: checkedConditions,
            otherConditions: otherCond,
          },
        },
      },
    });

    setDisplayErr(true);
    setSigEmpty(dataEmpty.isEmpty());

    setSubmitted(true);
    // Signature image ==  signatureImg.trimmedDataURL;
  };

  // Trims the Signature field
  let captureSignature = {};
  let dataEmpty = {};
  const trim = () => {
    setSignatureImg({
      trimmedDataURL: captureSignature
        .getTrimmedCanvas()
        .toDataURL('image/png'),
    });
  };

  // State object to contain signature image URL
  const [signatureImg, setSignatureImg] = useState('');

  // Clear signature box
  const clear = () => {
    captureSignature.clear();
  };
  const [sigEmpty, setSigEmpty] = useState(false);

  const switchCheck = (e, index) => {
    let checkBoxAction = e.className.split(' ')[0];
    let checkBoxSection = e.className.split(' ')[1];

    if (checkBoxAction == 'yes') {
      if (checkBoxSection == 'alcohol') {
        setAlcohol(!alcohol);
      }
      if (checkBoxSection == 'staph') {
        setStaph(!staph);
      }

      if (checkBoxSection == 'smoke') {
        setSmoke(!smoke);
      }

      if (checkBoxSection == 'allergies') {
        setAllergy(!allergies);
      }
    }
    if (
      checkBoxAction == 'yes' &&
      document.querySelector(`.${checkBoxSection}`).checked
    ) {
      if (checkBoxSection == 'alcohol') {
        setAlcohol(true);
      }
      if (checkBoxSection == 'staph') {
        setStaph(true);
      }

      if (checkBoxSection == 'smoke') {
        setSmoke(true);
      }

      if (checkBoxSection == 'allergies') {
        setAllergy(true);
      }
      document.querySelectorAll(`.no`)[index].checked = false;
    }

    if (checkBoxAction == 'no') {
      if (checkBoxSection == 'alcohol') {
        setAlcohol(false);
      }
      if (checkBoxSection == 'staph') {
        setStaph(false);
      }

      if (checkBoxSection == 'smoke') {
        setSmoke(false);
      }

      if (checkBoxSection == 'allergies') {
        setAllergy(false);
      }
    }
    if (
      checkBoxAction == 'no' &&
      document.querySelector(`.${checkBoxSection}`).checked
    ) {
      if (checkBoxSection == 'alcohol') {
        setAlcohol(false);
      }
      if (checkBoxSection == 'staph') {
        setStaph(false);
      }

      if (checkBoxSection == 'smoke') {
        setSmoke(false);
      }

      if (checkBoxSection == 'allergies') {
        setAllergy(false);
      }
      document.querySelectorAll(`.yes`)[index].checked = false;
    }
  };

  const [displayErr, setDisplayErr] = useState(false);
  const [submitReady, setSubmitReady] = useState(false);

  useEffect(() => {
    submitted ? checkData() : '';
  });

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => handleSecondSubmit(e)} className={styles.form}>
        <p className={styles.sectionHeader}>patient registration form</p>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="fullName">Full Name:</label>
          <input
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  fullName: e.target.value.trim(),
                },
              });
              setDisplayErr(false);
            }}
            id="fullName"
            placeholder="John Doe"
            type="text"
          />
          {displayErr && formData.registryData.fullName == '' && (
            <p className={styles.errorMsg}>Missing Data</p>
          )}
        </div>
        <div className={`${styles.inputWrapper} ${styles.age}`}>
          <label htmlFor="age">Age:</label>
          <input
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  age: e.target.value,
                },
              });
              setDisplayErr(false);
            }}
            id="age"
            placeholder="29"
            type="number"
          />
          {displayErr &&
            (formData.registryData.age < 1 ||
              formData.registryData.age > 150) && (
              <p className={styles.errorMsg}>Missing or Invalid Data</p>
            )}
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="sex">Sex:</label>
          <select
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  sex: e.target.value,
                },
              });
              setDisplayErr(false);
            }}
            id="sex"
          >
            <option defaultChecked="Select">Choose...</option>
            <option value="male" label="Male" name="male">
              Male
            </option>
            <option value="female" label="Female" name="female">
              Female
            </option>
            <option value="non-binary" label="Non-binary" name="female">
              Non Binary
            </option>
          </select>
          {displayErr && formData.registryData.sex == '' && (
            <p className={styles.errorMsg}>Missing Data</p>
          )}
        </div>
        <div className={`${styles.inputWrapper} ${styles.medCol}`}>
          <label htmlFor="address">Address:</label>
          <input
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  address: e.target.value.trim(),
                },
              });
              setDisplayErr(false);
            }}
            id="address"
            placeholder="26 Jeannette Pl"
            type="text"
          />
          {displayErr && formData.registryData.address == '' && (
            <p className={styles.errorMsg}>Missing Data</p>
          )}
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="dob">DOB:</label>
          <input
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  DOB: e.target.value.trim(),
                },
              });
              setDisplayErr(false);
            }}
            id="dob"
            placeholder=""
            type="text"
          />
          {displayErr && formData.registryData.DOB == '' && (
            <p className={styles.errorMsg}>Missing Data</p>
          )}
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="homeNum">Home #</label>
          <input
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  homeNum: e.target.value,
                },
              });
              setDisplayErr(false);
            }}
            id="homeNum"
            placeholder="435 544 3953"
            type="text"
          />
          {displayErr && formData.registryData.homeNum == '' && (
            <p className={styles.errorMsg}>Missing Data</p>
          )}
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="workNum">Work #</label>
          <input
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  workNum: e.target.value,
                },
              });
              setDisplayErr(false);
            }}
            id="workNum"
            placeholder="416 134 5266"
            type="text"
          />
          {displayErr && formData.registryData.workNum == '' && (
            <p className={styles.errorMsg}>Missing Data</p>
          )}
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="cellNum">Cell #</label>
          <input
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  cellNum: e.target.value,
                },
              });
              setDisplayErr(false);
            }}
            id="cellNum"
            placeholder="905 562 6353"
            type="text"
          />
          {displayErr && formData.registryData.cellNum == '' && (
            <p className={styles.errorMsg}>Missing Data</p>
          )}
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label htmlFor="email">E-mail:</label>
          <input
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  email: e.target.value.trim(),
                },
              });
              setDisplayErr(false);
            }}
            id="email"
            placeholder="Youremail@gmail.com"
            type="text"
          />
          {displayErr && formData.registryData.email == '' && (
            <p className={styles.errorMsg}>Missing Data</p>
          )}
        </div>
        <div className={`${styles.inputWrapper} ${styles.medCol}`}>
          <label htmlFor="occupation">Occupation:</label>
          <input
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  occupation: e.target.value.trim(),
                },
              });
              setDisplayErr(false);
            }}
            id="occupation"
            placeholder="Web Developer"
            type="text"
          />
          {displayErr && formData.registryData.occupation == '' && (
            <p className={styles.errorMsg}>Missing Data</p>
          )}
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="maritalStat">Marital Status</label>
          <select
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  maritalStat: e.target.value,
                },
              });
              setDisplayErr(false);
            }}
            id="maritalStat"
          >
            <option defaultChecked="Select">Choose...</option>
            <option value="Married" label="Married" name="married">
              Married
            </option>
            <option value="Single" label="Single" name="single">
              Single
            </option>
            <option value="Divorced" label="Divorced" name="divorced">
              Divorced
            </option>
            <option value="Widow" label="Widow" name="widow">
              Widow
            </option>
            <option
              value="Prefer not to say"
              label="Prefer not to say"
              name="prefer-not-to-say"
            >
              Prefer not to say
            </option>
          </select>
          {displayErr && formData.registryData.maritalStat == '' && (
            <p className={styles.errorMsg}>Missing Data</p>
          )}
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label htmlFor="consult">
            Reason for consultation/Areas of concern:
          </label>
          <textarea
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  reasonForConsult: e.target.value.trim(),
                },
              });
              setDisplayErr(false);
            }}
            id="consult"
            placeholder="Need more inquiry"
            type="text"
          />
          {displayErr && formData.registryData.reasonForConsult == '' && (
            <p className={styles.errorMsg}>Missing Data</p>
          )}
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label htmlFor="hearAbout">How did you hear about us?</label>
          <textarea
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  hearAboutUs: e.target.value.trim(),
                },
              });
              setDisplayErr(false);
            }}
            id="hearAbout"
            className={styles.shortText}
            placeholder="YouTube Ad"
            type="text"
          />
          {displayErr && formData.registryData.hearAboutUs == '' && (
            <p className={styles.errorMsg}>Missing Data</p>
          )}
        </div>
        <hr className={styles.hr}></hr>
        <p className={styles.sectionHeader2}>Emergency Contact</p>
        <div className={`${styles.inputWrapper} ${styles.contact}`}>
          <label htmlFor="emergency">Full name:</label>
          <input
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  emergencyContact: {
                    ...formData.registryData.emergencyContact,
                    fullName: e.target.value.trim(),
                  },
                },
              });
              setDisplayErr(false);
            }}
            id="emergency"
            placeholder="John Doe"
            type="text"
          />
          {displayErr &&
            formData.registryData.emergencyContact.fullName == '' && (
              <p className={styles.errorMsg}>Missing Data</p>
            )}
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="rely">Relationship:</label>
          <input
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  emergencyContact: {
                    ...formData.registryData.emergencyContact,
                    relationship: e.target.value.trim(),
                  },
                },
              });
              setDisplayErr(false);
            }}
            id="rely"
            placeholder="Father"
            type="text"
          />
          {displayErr &&
            formData.registryData.emergencyContact.relationship == '' && (
              <p className={styles.errorMsg}>Missing Data</p>
            )}
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label htmlFor="emergeAddress">Address:</label>
          <input
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  emergencyContact: {
                    ...formData.registryData.emergencyContact,
                    address: e.target.value.trim(),
                  },
                },
              });
              setDisplayErr(false);
            }}
            id="emergeAddress"
            placeholder="42 Crescent Dr"
            type="text"
          />
          {displayErr &&
            formData.registryData.emergencyContact.address == '' && (
              <p className={styles.errorMsg}>Missing Data</p>
            )}
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="emergePhone">Phone #</label>
          <input
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  emergencyContact: {
                    ...formData.registryData.emergencyContact,
                    phoneNum: e.target.value.trim(),
                  },
                },
              });
              setDisplayErr(false);
            }}
            id="emergePhone"
            placeholder="435 544 3953"
            type="text"
          />
          {displayErr &&
            formData.registryData.emergencyContact.phoneNum == '' && (
              <p className={styles.errorMsg}>Missing Data</p>
            )}
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="emergeWork">Work #</label>
          <input
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  emergencyContact: {
                    ...formData.registryData.emergencyContact,
                    workNum: e.target.value.trim(),
                  },
                },
              });
              setDisplayErr(false);
            }}
            id="emergeWork"
            placeholder="416 134 5266"
            type="text"
          />
          {displayErr &&
            formData.registryData.emergencyContact.workNum == '' && (
              <p className={styles.errorMsg}>Missing Data</p>
            )}
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="emergeCell">Cell #</label>
          <input
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  emergencyContact: {
                    ...formData.registryData.emergencyContact,
                    cellNum: e.target.value.trim(),
                  },
                },
              });
              setDisplayErr(false);
            }}
            id="emergeCell"
            placeholder="905 562 6353"
            type="text"
          />
          {displayErr &&
            formData.registryData.emergencyContact.cellNum == '' && (
              <p className={styles.errorMsg}>Missing Data</p>
            )}
        </div>
        <hr className={styles.hr}></hr>
        <p className={styles.sectionHeader2}>Medical history</p>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="height">Height (cm)</label>
          <input
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  medicalHistory: {
                    ...formData.registryData.medicalHistory,
                    height: e.target.value,
                  },
                },
              });
              setDisplayErr(false);
            }}
            id="height"
            placeholder={`171`}
            type="number"
          />
          {displayErr &&
            (formData.registryData.medicalHistory.height > 1000 ||
              formData.registryData.medicalHistory.height < 10) && (
              <p className={styles.errorMsg}>Missing or invalid Data</p>
            )}
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="weight">Weight (lbs)</label>
          <input
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  medicalHistory: {
                    ...formData.registryData.medicalHistory,
                    weight: e.target.value,
                  },
                },
              });
              setDisplayErr(false);
            }}
            id="weight"
            placeholder="185"
            type="number"
          />
          {displayErr &&
            (formData.registryData.medicalHistory.weight > 1000 ||
              formData.registryData.medicalHistory.weight < 1) && (
              <p className={styles.errorMsg}>Missing or invalid Data</p>
            )}
        </div>
        <div className={`${styles.inputWrapper} ${styles.physicalExam}`}>
          <label className={styles.physicalExamLabel}>
            When was your last physical exam?
          </label>
          <input
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  medicalHistory: {
                    ...formData.registryData.medicalHistory,
                    lastPhysical: e.target.value,
                  },
                },
              });
              setDisplayErr(false);
            }}
            id="dateOfPhysical"
            type="date"
            name="dateOfPhysical"
          />
          {displayErr &&
            formData.registryData.medicalHistory.lastPhysical == '' && (
              <p className={styles.errorMsg}>Missing Data</p>
            )}
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label>Do you smoke?</label>
          <div className={styles.checkboxWrapper}>
            <div>
              <input
                id="smokeYes"
                onChange={(e) => {
                  switchCheck(e.target, 0);
                  setFormData({
                    ...formData,
                    registryData: {
                      ...formData.registryData,
                      medicalHistory: {
                        ...formData.registryData.medicalHistory,
                        smoker: e.target.checked
                          ? { packsPerDay: '', howLong: '' }
                          : null,
                      },
                    },
                  });
                  setDisplayErr(false);
                }}
                className={`yes smoke ${styles.yesCheckbox}`}
                type="checkbox"
              />
              <label htmlFor="smokeYes">Yes</label>
            </div>
            <div>
              <input
                id="smokeNo"
                onChange={(e) => {
                  switchCheck(e.target, 0);
                  setFormData({
                    ...formData,
                    registryData: {
                      ...formData.registryData,
                      medicalHistory: {
                        ...formData.registryData.medicalHistory,
                        smoker: e.target.checked ? 'no' : null,
                      },
                    },
                  });
                  setDisplayErr(false);
                }}
                className={`no smoke ${styles.noCheckbox}`}
                type="checkbox"
              />
              <label htmlFor="smokeNo">No</label>
            </div>
          </div>
        </div>
        {smoke ? (
          <div
            style={{ marginTop: '-20px', marginBottom: '5px' }}
            className={styles.fullCol}
          >
            <div className={`${styles.inputWrapper}`}>
              <label htmlFor="packs">How many packs a day?</label>
              <input
                className={styles.specialInputs}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    registryData: {
                      ...formData.registryData,
                      medicalHistory: {
                        ...formData.registryData.medicalHistory,
                        smoker: {
                          ...formData.registryData.medicalHistory.smoker,
                          packsPerDay: e.target.value,
                        },
                      },
                    },
                  });
                  setDisplayErr(false);
                }}
                id="packs"
                placeholder="1"
                type="number"
              />
            </div>
            <div className={`${styles.inputWrapper}`}>
              <label htmlFor="packsHowLong">For how long?</label>
              <input
                className={styles.specialInputs}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    registryData: {
                      ...formData.registryData,
                      medicalHistory: {
                        ...formData.registryData.medicalHistory,
                        smoker: {
                          ...formData.registryData.medicalHistory.smoker,
                          howLong: e.target.value.trim(),
                        },
                      },
                    },
                  });
                  setDisplayErr(false);
                }}
                id="packsHowLong"
                placeholder="1 year"
                type="text"
              />
            </div>
          </div>
        ) : (
          ''
        )}
        {displayErr && formData.registryData.medicalHistory.smoker == null && (
          <p style={{ marginTop: '-23px' }} className={styles.errorMsg}>
            Missing Data
          </p>
        )}
        {displayErr &&
        formData.registryData.medicalHistory.smoker != null &&
        formData.registryData.medicalHistory.smoker != 'no' ? (
          formData.registryData.medicalHistory.smoker.packsPerDay < 1 ||
          formData.registryData.medicalHistory.smoker.packsPerDay > 50 ||
          formData.registryData.medicalHistory.smoker.howLong == '' ? (
            <p style={{ marginTop: '-23px' }} className={styles.errorMsg}>
              Missing Data
            </p>
          ) : (
            ''
          )
        ) : (
          ''
        )}
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label>Do you drink alcohol?</label>
          <div className={styles.checkboxWrapper}>
            <div>
              <input
                id="alcoholYes"
                onChange={(e) => {
                  switchCheck(e.target, 1);
                  setFormData({
                    ...formData,
                    registryData: {
                      ...formData.registryData,
                      medicalHistory: {
                        ...formData.registryData.medicalHistory,
                        alcoholDrinker: e.target.checked
                          ? { howManyDrinks: '' }
                          : null,
                      },
                    },
                  });
                  setDisplayErr(false);
                }}
                className={`yes alcohol ${styles.yesCheckbox}`}
                type="checkbox"
              />
              <label htmlFor="alcoholYes">Yes</label>
            </div>
            <div>
              <input
                id="alcoholNo"
                onChange={(e) => {
                  switchCheck(e.target, 1);
                  setFormData({
                    ...formData,
                    registryData: {
                      ...formData.registryData,
                      medicalHistory: {
                        ...formData.registryData.medicalHistory,
                        alcoholDrinker: e.target.checked ? 'no' : null,
                      },
                    },
                  });
                  setDisplayErr(false);
                }}
                className={`no alcohol ${styles.noCheckbox}`}
                type="checkbox"
              />
              <label htmlFor="alcoholNo">No</label>
            </div>
          </div>
        </div>
        {alcohol ? (
          <div
            style={{ marginTop: '-20px', marginBottom: '5px' }}
            className={`${styles.inputWrapper} ${styles.fullCol}`}
          >
            <label htmlFor="howManyDrinks">How many drinks a week?</label>
            <input
              className={styles.specialInputs}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  registryData: {
                    ...formData.registryData,
                    medicalHistory: {
                      ...formData.registryData.medicalHistory,
                      alcoholDrinker: {
                        howManyDrinks: e.target.value,
                      },
                    },
                  },
                });
                setDisplayErr(false);
              }}
              id="howManyDrinks"
              placeholder="2"
              type="number"
            />
          </div>
        ) : (
          ''
        )}
        {displayErr &&
          formData.registryData.medicalHistory.alcoholDrinker == null && (
            <p style={{ marginTop: '-23px' }} className={styles.errorMsg}>
              Missing Data
            </p>
          )}
        {displayErr &&
        formData.registryData.medicalHistory.alcoholDrinker != null &&
        formData.registryData.medicalHistory.alcoholDrinker != 'no' ? (
          formData.registryData.medicalHistory.alcoholDrinker.howManyDrinks <
            1 ||
          formData.registryData.medicalHistory.alcoholDrinker.howManyDrinks >
            100 ? (
            <p style={{ marginTop: '-23px' }} className={styles.errorMsg}>
              Missing Data
            </p>
          ) : (
            ''
          )
        ) : (
          ''
        )}
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label htmlFor="previousWork">
            If applicable, have you ever had any previous cosmetic or surgical
            procedures? If yes describe
          </label>
          <textarea
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  medicalHistory: {
                    ...formData.registryData.medicalHistory,
                    previousCosmetics: e.target.value.trim(),
                  },
                },
              });
              setDisplayErr(false);
            }}
            id="previousWork"
            placeholder="Year, procedure, surgeon, city and so forth"
            type="text"
          />
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label htmlFor="medicationsYouTake">
            If applicable, please list all the medications that you take and for
            what purpose:
          </label>
          <textarea
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  medicalHistory: {
                    ...formData.registryData.medicalHistory,
                    activeMedications: e.target.value.trim(),
                  },
                },
              });
              setDisplayErr(false);
            }}
            id="medicationsYouTake"
            className={styles.shortText}
            placeholder="I take this medication for this reason..."
            type="text"
          />
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label htmlFor="herbalSups">
            If applicable, please list all the herbal supplements that you take
            and for what purpose:
          </label>
          <textarea
            onChange={(e) => {
              setFormData({
                ...formData,
                registryData: {
                  ...formData.registryData,
                  medicalHistory: {
                    ...formData.registryData.medicalHistory,
                    activeHerbalSups: e.target.value.trim(),
                  },
                },
              });
              setDisplayErr(false);
            }}
            id="herbalSups"
            className={styles.shortText}
            placeholder="I take this herbal supplement for because..."
            type="text"
          />
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label>
            If applicable, please check any medical condition that you currently
            suffer from, or have experienced in the past:
          </label>
          <div className={styles.medicalCondition}>
            {medicalConditions.map((medical, i) => {
              return (
                <div key={i}>
                  <input
                    id={medical}
                    name={medical}
                    onChange={(e) => {
                      handleMedicals(e, medical, i);
                      setDisplayErr(false);
                    }}
                    className={styles.yesCheckbox}
                    type="checkbox"
                  ></input>
                  <label htmlFor={medical}>{medical}</label>
                </div>
              );
            })}
            <div
              className={`${styles.fullCol} ${styles.shortText} ${styles.otherCond}`}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <label htmlFor="Other">Other:</label>
              <textarea
                onChange={(e) => {
                  setOtherCond(e.target.value);
                  setDisplayErr(false);
                }}
                id="Other"
                type="text"
              ></textarea>
            </div>
          </div>
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label>Do you have any known allergies? Yes No</label>
          <div className={styles.checkboxWrapper}>
            <div>
              <input
                id="noAllergies"
                onChange={(e) => {
                  switchCheck(e.target, 2);
                  setFormData({
                    ...formData,
                    registryData: {
                      ...formData.registryData,
                      medicalHistory: {
                        ...formData.registryData.medicalHistory,
                        allergies: e.target.checked ? '' : null,
                      },
                    },
                  });
                  setDisplayErr(false);
                }}
                className={`yes allergies ${styles.yesCheckbox}`}
                type="checkbox"
              />
              <label htmlFor="noAllergies">Yes</label>
            </div>
            <div>
              <input
                id="yesAllergies"
                onChange={(e) => {
                  switchCheck(e.target, 2);
                  setFormData({
                    ...formData,
                    registryData: {
                      ...formData.registryData,
                      medicalHistory: {
                        ...formData.registryData.medicalHistory,
                        allergies: e.target.checked ? 'no' : null,
                      },
                    },
                  });
                  setDisplayErr(false);
                }}
                className={`no allergies ${styles.noCheckbox}`}
                type="checkbox"
              />
              <label htmlFor="yesAllergies">No</label>
            </div>
          </div>
          {allergies ? (
            <div>
              <label htmlFor="describeReactions">
                What medication and describe the reaction:
              </label>
              <textarea
                style={{ width: '100%' }}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    registryData: {
                      ...formData.registryData,
                      medicalHistory: {
                        ...formData.registryData.medicalHistory,
                        allergies: e.target.value.trim(),
                      },
                    },
                  });
                  setDisplayErr(false);
                }}
                id="describeReactions"
                className={styles.shorterText}
                placeholder="I take the medication and this is the reaction..."
                type="text"
              />
            </div>
          ) : (
            ''
          )}
          {displayErr &&
            formData.registryData.medicalHistory.allergies == null && (
              <p className={styles.errorMsg}>Missing Data</p>
            )}
          {displayErr &&
            formData.registryData.medicalHistory.allergies != null &&
            formData.registryData.medicalHistory.allergies != 'no' &&
            formData.registryData.medicalHistory.allergies.length < 1 && (
              <p className={styles.errorMsg}>Missing Data</p>
            )}
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label>Have you ever had a Staph/MRSA infection in the past?</label>
          <div className={styles.checkboxWrapper}>
            <div>
              <input
                id="yesStaph"
                onChange={(e) => {
                  switchCheck(e.target, 3);
                  switchCheck(e.target, 3);
                  setFormData({
                    ...formData,
                    registryData: {
                      ...formData.registryData,
                      medicalHistory: {
                        ...formData.registryData.medicalHistory,
                        staph: e.target.checked ? '' : null,
                      },
                    },
                  });
                  setDisplayErr(false);
                }}
                className={`yes staph ${styles.yesCheckbox}`}
                type="checkbox"
              />
              <label htmlFor="yesStaph">Yes</label>
            </div>
            <div>
              <input
                id="noStaph"
                onChange={(e) => {
                  switchCheck(e.target, 3);
                  setFormData({
                    ...formData,
                    registryData: {
                      ...formData.registryData,
                      medicalHistory: {
                        ...formData.registryData.medicalHistory,
                        staph: e.target.checked ? 'no' : null,
                      },
                    },
                  });
                  setDisplayErr(false);
                }}
                className={`no staph ${styles.noCheckbox}`}
                type="checkbox"
              />
              <label htmlFor="noStaph">No</label>
            </div>
          </div>
          {staph ? (
            <>
              <label htmlFor="indicateInfection">
                Please indicate where on your body the infection was located and
                how/when it was treated:
              </label>
              <textarea
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    registryData: {
                      ...formData.registryData,
                      medicalHistory: {
                        ...formData.registryData.medicalHistory,
                        staph: e.target.value.trim(),
                      },
                    },
                  });
                  setDisplayErr(false);
                }}
                id="indicateInfection"
                className={styles.shorterText}
                placeholder="The infection is located here and this is how i treated it..."
                type="text"
              />
            </>
          ) : (
            ''
          )}
          {displayErr && formData.registryData.medicalHistory.staph == null && (
            <p style={{ marginTop: '4px' }} className={styles.errorMsg}>
              Missing Data
            </p>
          )}
          {/* If staph is not null and 'no' is not checked, that means Yes is checked */}
          {displayErr &&
            formData.registryData.medicalHistory.staph != null &&
            formData.registryData.medicalHistory.staph != 'no' &&
            formData.registryData.medicalHistory.staph.length < 1 && (
              <p style={{ marginTop: '4px' }} className={styles.errorMsg}>
                Missing Data
              </p>
            )}
        </div>
        <hr className={styles.hr}></hr>
        <div
          className={`${styles.inputWrapper} ${styles.fullCol} ${styles.confirm}`}
        >
          I confirm that the above is true and accurate to the best of my
          knowledge.
        </div>
        <div className={`${styles.signWrapper} ${styles.fullCol}`}>
          <div className={styles.signInnerWrapper}>
            <div
              onMouseDown={() => setSigEmpty(dataEmpty.isEmpty())}
              className={styles.signInnerItems}
            >
              <label>Signature</label>
              <SignatureCanvas
                penColor="black"
                backgroundColor="rgba(0,0,0, 0.1)"
                ref={(ref) => {
                  captureSignature = ref;
                  dataEmpty = ref;
                }}
                canvasProps={{
                  width: 350,
                  height: 200,
                  className: 'sigCanvas',
                }}
              />
              {displayErr && sigEmpty && (
                <p className={styles.errorMsgSig}>Missing Data</p>
              )}
              <button
                className={`${styles.buttons} ${styles.clearSig}`}
                onClick={clear}
              >
                Clear
              </button>
            </div>
            <div className={styles.signInnerItems}>
              <label>Date</label>
              <input
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    registryData: {
                      ...formData.registryData,
                      date: e.target.value,
                    },
                  });
                  setDisplayErr(false);
                }}
                className={styles.dateSelect}
                type="date"
                id="dateOfSignature"
                name="dateOfSignature"
              />
              {displayErr && formData.registryData.date == '' && (
                <p
                  style={{ marginTop: '10px' }}
                  className={styles.errorMsgDate}
                >
                  Missing Data
                </p>
              )}
            </div>
          </div>
        </div>

        {/* If the first block returns false, that means those criteria's pass...
        In that case, check the other conditionals */}
        {displayErr &&
        (formData.registryData.date == '' ||
          sigEmpty ||
          formData.registryData.medicalHistory.allergies == null ||
          formData.registryData.medicalHistory.staph == null ||
          formData.registryData.medicalHistory.alcoholDrinker == null ||
          formData.registryData.medicalHistory.smoker == null ||
          formData.registryData.medicalHistory.lastPhysical == '' ||
          formData.registryData.medicalHistory.weight > 1000 ||
          formData.registryData.medicalHistory.weight < 1 ||
          formData.registryData.medicalHistory.height > 1000 ||
          formData.registryData.medicalHistory.height < 10 ||
          formData.registryData.emergencyContact.cellNum == '' ||
          formData.registryData.emergencyContact.workNum == '' ||
          formData.registryData.emergencyContact.phoneNum == '' ||
          formData.registryData.emergencyContact.address == '' ||
          formData.registryData.emergencyContact.relationship == '' ||
          formData.registryData.emergencyContact.fullName == '' ||
          formData.registryData.hearAboutUs == '' ||
          formData.registryData.reasonForConsult == '' ||
          formData.registryData.maritalStat == '' ||
          formData.registryData.occupation == '' ||
          formData.registryData.email == '' ||
          formData.registryData.cellNum == '' ||
          formData.registryData.workNum == '' ||
          formData.registryData.homeNum == '' ||
          formData.registryData.DOB == '' ||
          formData.registryData.address == '' ||
          formData.registryData.sex == '' ||
          formData.registryData.age < 1 ||
          formData.registryData.age > 150 ||
          formData.registryData.fullName == '') ? (
          <p className={styles.mainErrorMsg}>Please fill all missing Data</p>
        ) : displayErr &&
          formData.registryData.medicalHistory.staph != null &&
          formData.registryData.medicalHistory.staph != 'no' &&
          formData.registryData.medicalHistory.staph.length < 1 ? (
          <p className={styles.mainErrorMsg}>Please fill all missing Data</p>
        ) : displayErr &&
          formData.registryData.medicalHistory.allergies != null &&
          formData.registryData.medicalHistory.allergies != 'no' &&
          formData.registryData.medicalHistory.allergies.length < 1 ? (
          <p className={styles.mainErrorMsg}>Please fill all missing Data</p>
        ) : displayErr &&
          formData.registryData.medicalHistory.alcoholDrinker != null &&
          formData.registryData.medicalHistory.alcoholDrinker != 'no' ? (
          formData.registryData.medicalHistory.alcoholDrinker.howManyDrinks <
            1 ||
          formData.registryData.medicalHistory.alcoholDrinker.howManyDrinks >
            100 ? (
            <p className={styles.mainErrorMsg}>Please fill all missing Data</p>
          ) : (
            ''
          )
        ) : displayErr &&
          formData.registryData.medicalHistory.smoker != null &&
          formData.registryData.medicalHistory.smoker != 'no' ? (
          formData.registryData.medicalHistory.smoker.packsPerDay < 1 ||
          formData.registryData.medicalHistory.smoker.packsPerDay > 50 ||
          formData.registryData.medicalHistory.smoker.howLong == '' ? (
            <p className={styles.mainErrorMsg}>Please fill all missing Data</p>
          ) : (
            ''
          )
        ) : (
          ''
        )}
        <button onClick={trim} className={styles.submitBtn} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistryForm;
