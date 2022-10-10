import React, { useState, useEffect } from 'react';
import styles from '../styles/RegistryForm.module.css';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';

const RegistryForm = ({ formData, setFormData, setShowForm }) => {
  const [showAlcohol, setShowAlcohol] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);
  const [showAllergy, setShowAllergy] = useState(false);
  const [showStaph, setShowStaph] = useState(false);

  const {
    allergies,
    staph,
    alcoholDrinker,
    smoker,
    lastPhysical,
    weight,
    height,
  } = formData.registryData.medicalHistory;

  const {
    cellNum: egCellNum,
    workNum: egWorkNum,
    phoneNum: egPhoneNum,
    address: egAddress,
    relationship,
    fullName,
  } = formData.registryData.emergencyContact;

  const {
    hearAboutUs,
    reasonForConsult,
    maritalStat,
    occupation,
    email,
    homeNum,
    cellNum,
    workNum,
    address,
    DOB,
    sex,
    age,
    date,
  } = formData.registryData;

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

  const extractImg = async () => {
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

      // Update the formData and include the newly generated cloudinary link for the signature
      setFormData({
        ...formData,
        registryData: {
          ...formData.registryData,
          signature: url,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const checkData = () => {
    if (
      date == '' ||
      sigEmpty ||
      allergies == null ||
      staph == null ||
      alcoholDrinker == null ||
      smoker == null ||
      lastPhysical == '' ||
      weight > 1000 ||
      weight < 1 ||
      height > 1000 ||
      height < 10 ||
      egCellNum == '' ||
      egWorkNum == '' ||
      egPhoneNum == '' ||
      egAddress == '' ||
      relationship == '' ||
      fullName == '' ||
      hearAboutUs == '' ||
      reasonForConsult == '' ||
      maritalStat == '' ||
      occupation == '' ||
      email == '' ||
      cellNum == '' ||
      workNum == '' ||
      homeNum == '' ||
      DOB == '' ||
      address == '' ||
      sex == '' ||
      age < 1 ||
      age > 150 ||
      fullName == ''
    ) {
      return setSubmitted(false);
    }
    if (staph != null && staph != 'no' && staph.length < 1) {
      return setSubmitted(false);
    }
    if (allergies != null && allergies != 'no' && allergies.length < 1) {
      return setSubmitted(false);
    }
    if (alcoholDrinker != null && alcoholDrinker != 'no') {
      if (
        alcoholDrinker.howManyDrinks < 1 ||
        alcoholDrinker.howManyDrinks > 100
      ) {
        return setSubmitted(false);
      }
    }
    if (smoker != null && smoker != 'no') {
      if (
        smoker.packsPerDay < 1 ||
        smoker.packsPerDay > 50 ||
        smoker.howLong == ''
      ) {
        return setSubmitted(false);
      }
    }

    // Take the signature, push it and extract the image direct link via cloudinary
    // Then update the formData with that link
    extractImg();
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
        signature: signatureImg.trimmedDataURL,
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
        setShowAlcohol(!showAlcohol);
      }
      if (checkBoxSection == 'staph') {
        setShowStaph(!showStaph);
      }

      if (checkBoxSection == 'smoke') {
        setShowSmoke(!showSmoke);
      }

      if (checkBoxSection == 'allergies') {
        setShowAllergy(!showAllergy);
      }
    }
    if (
      checkBoxAction == 'yes' &&
      document.querySelector(`.${checkBoxSection}`).checked
    ) {
      if (checkBoxSection == 'alcohol') {
        setShowAlcohol(true);
      }
      if (checkBoxSection == 'staph') {
        setShowStaph(true);
      }

      if (checkBoxSection == 'smoke') {
        setShowSmoke(true);
      }

      if (checkBoxSection == 'allergies') {
        setShowAllergy(true);
      }
      document.querySelectorAll(`.no`)[index].checked = false;
    }

    if (checkBoxAction == 'no') {
      if (checkBoxSection == 'alcohol') {
        setShowAlcohol(false);
      }
      if (checkBoxSection == 'staph') {
        setShowStaph(false);
      }

      if (checkBoxSection == 'smoke') {
        setShowSmoke(false);
      }

      if (checkBoxSection == 'allergies') {
        setShowAllergy(false);
      }
    }
    if (
      checkBoxAction == 'no' &&
      document.querySelector(`.${checkBoxSection}`).checked
    ) {
      if (checkBoxSection == 'alcohol') {
        setShowAlcohol(false);
      }
      if (checkBoxSection == 'staph') {
        setShowStaph(false);
      }

      if (checkBoxSection == 'smoke') {
        setShowSmoke(false);
      }

      if (checkBoxSection == 'allergies') {
        setShowAllergy(false);
      }
      document.querySelectorAll(`.yes`)[index].checked = false;
    }
  };

  const [displayErr, setDisplayErr] = useState(false);

  useEffect(() => {
    // Check first if user submitted the form
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
          {displayErr && fullName == '' && (
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
          {displayErr && (age < 1 || age > 150) && (
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
          {displayErr && sex == '' && (
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
          {displayErr && address == '' && (
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
            type="date"
          />
          {displayErr && DOB == '' && (
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
          {displayErr && homeNum == '' && (
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
          {displayErr && workNum == '' && (
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
          {displayErr && cellNum == '' && (
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
          {displayErr && email == '' && (
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
          {displayErr && occupation == '' && (
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
          {displayErr && maritalStat == '' && (
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
          {displayErr && reasonForConsult == '' && (
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
          {displayErr && hearAboutUs == '' && (
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
          {displayErr && fullName == '' && (
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
          {displayErr && relationship == '' && (
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
          {displayErr && egAddress == '' && (
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
          {displayErr && egPhoneNum == '' && (
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
          {displayErr && egWorkNum == '' && (
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
          {displayErr && egCellNum == '' && (
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
          {displayErr && (height > 1000 || height < 10) && (
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
          {displayErr && (weight > 1000 || weight < 1) && (
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
          {displayErr && lastPhysical == '' && (
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
        {showSmoke ? (
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
                          ...smoker,
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
                          ...smoker,
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
        {displayErr && smoker == null && (
          <p style={{ marginTop: '-23px' }} className={styles.errorMsg}>
            Missing Data
          </p>
        )}
        {displayErr && smoker != null && smoker != 'no' ? (
          smoker.packsPerDay < 1 ||
          smoker.packsPerDay > 50 ||
          smoker.howLong == '' ? (
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
        {showAlcohol ? (
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
        {displayErr && alcoholDrinker == null && (
          <p style={{ marginTop: '-23px' }} className={styles.errorMsg}>
            Missing Data
          </p>
        )}
        {displayErr && alcoholDrinker != null && alcoholDrinker != 'no' ? (
          alcoholDrinker.howManyDrinks < 1 ||
          alcoholDrinker.howManyDrinks > 100 ? (
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
          {showAllergy ? (
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
          {displayErr && allergies == null && (
            <p className={styles.errorMsg}>Missing Data</p>
          )}
          {displayErr &&
            allergies != null &&
            allergies != 'no' &&
            allergies.length < 1 && (
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
          {showStaph ? (
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
          {displayErr && staph == null && (
            <p style={{ marginTop: '4px' }} className={styles.errorMsg}>
              Missing Data
            </p>
          )}
          {/* If staph is not null and 'no' is not checked, that means Yes is checked */}
          {displayErr && staph != null && staph != 'no' && staph.length < 1 && (
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
              {displayErr && date == '' && (
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
        (date == '' ||
          sigEmpty ||
          allergies == null ||
          staph == null ||
          alcoholDrinker == null ||
          smoker == null ||
          lastPhysical == '' ||
          weight > 1000 ||
          weight < 1 ||
          height > 1000 ||
          height < 10 ||
          egCellNum == '' ||
          egWorkNum == '' ||
          egPhoneNum == '' ||
          egAddress == '' ||
          relationship == '' ||
          fullName == '' ||
          hearAboutUs == '' ||
          reasonForConsult == '' ||
          maritalStat == '' ||
          occupation == '' ||
          email == '' ||
          cellNum == '' ||
          workNum == '' ||
          homeNum == '' ||
          DOB == '' ||
          address == '' ||
          sex == '' ||
          age < 1 ||
          age > 150 ||
          fullName == '') ? (
          <p className={styles.mainErrorMsg}>Please fill all missing Data</p>
        ) : displayErr && staph != null && staph != 'no' && staph.length < 1 ? (
          <p className={styles.mainErrorMsg}>Please fill all missing Data</p>
        ) : displayErr &&
          allergies != null &&
          allergies != 'no' &&
          allergies.length < 1 ? (
          <p className={styles.mainErrorMsg}>Please fill all missing Data</p>
        ) : displayErr && alcoholDrinker != null && alcoholDrinker != 'no' ? (
          alcoholDrinker.howManyDrinks < 1 ||
          alcoholDrinker.howManyDrinks > 100 ? (
            <p className={styles.mainErrorMsg}>Please fill all missing Data</p>
          ) : (
            ''
          )
        ) : displayErr && smoker != null && smoker != 'no' ? (
          smoker.packsPerDay < 1 ||
          smoker.packsPerDay > 50 ||
          smoker.howLong == '' ? (
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
