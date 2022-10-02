import React, { useState } from 'react';
import styles from '../styles/RegistryForm.module.css';
import { useRouter } from 'next/router';
import SignatureCanvas from 'react-signature-canvas';
import Image from 'next/image';

const RegistryForm = ({ formData, setFormData, setShowForm }) => {
  const router = useRouter();

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

    setShowForm(3);

    // router.push('/form-completed');
  };

  // Trims the Signature field
  let captureSignature = {};
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
            }}
            id="fullName"
            placeholder="John Doe"
            type="text"
          />
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
            }}
            id="age"
            placeholder="29"
            type="number"
          />
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
            }}
            id="address"
            placeholder="26 Jeannette Pl"
            type="text"
          />
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
            }}
            id="dob"
            placeholder=""
            type="text"
          />
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
            }}
            id="homeNum"
            placeholder="435 544 3953"
            type="text"
          />
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
            }}
            id="workNum"
            placeholder="416 134 5266"
            type="text"
          />
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
            }}
            id="cellNum"
            placeholder="905 562 6353"
            type="text"
          />
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
            }}
            id="email"
            placeholder="Youremail@gmail.com"
            type="text"
          />
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
            }}
            id="occupation"
            placeholder="Web Developer"
            type="text"
          />
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
            }}
            id="consult"
            placeholder="Need more inquiry"
            type="text"
          />
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
            }}
            id="hearAbout"
            className={styles.shortText}
            placeholder="YouTube Ad"
            type="text"
          />
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
            }}
            id="emergency"
            placeholder="John Doe"
            type="text"
          />
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
            }}
            id="rely"
            placeholder="Father"
            type="text"
          />
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
            }}
            id="emergeAddress"
            placeholder="42 Crescent Dr"
            type="text"
          />
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
            }}
            id="emergePhone"
            placeholder="435 544 3953"
            type="text"
          />
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
            }}
            id="emergeWork"
            placeholder="416 134 5266"
            type="text"
          />
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
            }}
            id="emergeCell"
            placeholder="905 562 6353"
            type="text"
          />
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
                    height: e.target.value.trim(),
                  },
                },
              });
            }}
            id="height"
            placeholder={`171`}
            type="text"
          />
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
                    weight: e.target.value.trim(),
                  },
                },
              });
            }}
            id="weight"
            placeholder="185"
            type="text"
          />
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
            }}
            id="dateOfPhysical"
            type="date"
            name="dateOfPhysical"
          />
        </div>
        <div className={`${styles.inputWrapper} ${styles.smoke}`}>
          <label>Do you smoke?</label>
          <div className={styles.checkboxWrapper}>
            <div>
              <input
                id="smokeYes"
                onChange={(e) => switchCheck(e.target, 0)}
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
                        smoker: 'no',
                      },
                    },
                  });
                }}
                className={`no smoke ${styles.noCheckbox}`}
                type="checkbox"
              />
              <label htmlFor="smokeNo">No</label>
            </div>
          </div>
        </div>
        {smoke ? (
          <>
            <div className={`${styles.inputWrapper}`}>
              <label htmlFor="packs">How many packs a day?</label>
              <input
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
                }}
                id="packs"
                placeholder="1"
                type="number"
              />
            </div>
            <div className={`${styles.inputWrapper}`}>
              <label htmlFor="packsHowLong">For how long?</label>
              <input
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
                }}
                id="packsHowLong"
                placeholder="1 year"
                type="text"
              />
            </div>
          </>
        ) : (
          ''
        )}
        <div className={`${styles.inputWrapper} ${styles.alcohol}`}>
          <label>Do you drink alcohol?</label>
          <div className={styles.checkboxWrapper}>
            <div>
              <input
                id="alcoholYes"
                onChange={(e) => switchCheck(e.target, 1)}
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
                        alcoholDrinker: 'no',
                      },
                    },
                  });
                }}
                className={`no alcohol ${styles.noCheckbox}`}
                type="checkbox"
              />
              <label htmlFor="alcoholNo">No</label>
            </div>
          </div>
        </div>
        {alcohol ? (
          <div className={`${styles.inputWrapper}`}>
            <label htmlFor="howManyDrinks">How many drinks a week?</label>
            <input
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
              }}
              id="howManyDrinks"
              placeholder="2"
              type="number"
            />
          </div>
        ) : (
          ''
        )}
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label htmlFor="previousWork">
            Have you ever had any previous cosmetic or surgical procedures? If
            yes describe
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
            }}
            id="previousWork"
            placeholder="Year, procedure, surgeon, city and so forth"
            type="text"
          />
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label htmlFor="medicationsYouTake">
            Please list all the medications that you take and for what purpose:
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
            }}
            id="medicationsYouTake"
            className={styles.shortText}
            placeholder="I take this medication for this reason..."
            type="text"
          />
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label htmlFor="herbalSups">
            Please list all the herbal supplements that you take and for what
            purpose:
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
            }}
            id="herbalSups"
            className={styles.shortText}
            placeholder="I take this herbal supplement for because..."
            type="text"
          />
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label>
            Please check any medical condition that you currently suffer from,
            or have experienced in the past:
          </label>
          <div className={styles.medicalCondition}>
            {medicalConditions.map((medical, i) => {
              return (
                <div key={i}>
                  <input
                    id={medical}
                    name={medical}
                    onChange={(e) => handleMedicals(e, medical, i)}
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
                onChange={(e) => setOtherCond(e.target.value)}
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
                onChange={(e) => switchCheck(e.target, 2)}
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
                        allergies: 'no',
                      },
                    },
                  });
                }}
                className={`no allergies ${styles.noCheckbox}`}
                type="checkbox"
              />
              <label htmlFor="yesAllergies">No</label>
            </div>
          </div>
          {allergies ? (
            <>
              <label htmlFor="describeReactions">
                What medication and describe the reaction:
              </label>
              <textarea
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
                }}
                id="describeReactions"
                className={styles.shorterText}
                placeholder="I take the medication and this is the reaction..."
                type="text"
              />
            </>
          ) : (
            ''
          )}
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label>Have you ever had a Staph/MRSA infection in the past?</label>
          <div className={styles.checkboxWrapper}>
            <div>
              <input
                id="yesStaph"
                onChange={(e) => switchCheck(e.target, 3)}
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
                        staph: 'no',
                      },
                    },
                  });
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
            <div className={styles.signInnerItems}>
              <label>Signature</label>
              <SignatureCanvas
                penColor="black"
                backgroundColor="rgba(0,0,0, 0.1)"
                ref={(ref) => {
                  captureSignature = ref;
                }}
                canvasProps={{
                  width: 360,
                  height: 200,
                  className: 'sigCanvas',
                }}
              />
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
                }}
                className={styles.dateSelect}
                type="date"
                id="dateOfSignature"
                name="dateOfSignature"
              />
            </div>
          </div>
        </div>
        {signatureImg && (
          <Image
            src={signatureImg.trimmedDataURL}
            width={100}
            height={100}
            alt="captureSignature"
          />
        )}
        <button onClick={trim} className={styles.submitBtn} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistryForm;
