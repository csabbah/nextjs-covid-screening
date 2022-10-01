import React, { useState } from 'react';
import styles from '../styles/RegistryForm.module.css';
import { useRouter } from 'next/router';
import SignatureCanvas from 'react-signature-canvas';
import Image from 'next/image';

const RegistryForm = ({ formData, setFormData }) => {
  const router = useRouter();

  const [alcohol, setAlcohol] = useState(false);
  const [smoke, setSmoke] = useState(false);
  const [allergies, setAllergy] = useState(false);
  const [staph, setStaph] = useState(false);

  const handleSecondSubmit = (e) => {
    e.preventDefault();

    // Save data to formData state, create User model then redirect to a different route saying submission completed!

    // router.push('/form-completed');
  };

  console.log(formData);
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

    console.log(checkBoxSection, checkBoxAction, index);

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
          <input id="fullName" placeholder="John Doe" type="text" />
        </div>
        <div className={`${styles.inputWrapper} ${styles.age}`}>
          <label htmlFor="age">Age:</label>
          <input id="age" placeholder="29" type="number" />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="sex">Sex:</label>
          <select id="sex">
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
          <input id="address" placeholder="26 Jeannette Pl" type="text" />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="dob">DOB:</label>
          <input id="dob" placeholder="" type="text" />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="homeNum">Home #</label>
          <input id="homeNum" placeholder="435 544 3953" type="text" />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="workNum">Work #</label>
          <input id="workNum" placeholder="416 134 5266" type="text" />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="cellNum">Cell #</label>
          <input id="cellNum" placeholder="905 562 6353" type="text" />
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label htmlFor="email">E-mail:</label>
          <input id="email" placeholder="Youremail@gmail.com" type="text" />
        </div>
        <div className={`${styles.inputWrapper} ${styles.medCol}`}>
          <label htmlFor="occupation">Occupation:</label>
          <input id="occupation" placeholder="Web Developer" type="text" />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="maritalStat">Marital Status</label>
          <select id="maritalStat">
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
          <textarea id="consult" placeholder="Need more inquiry" type="text" />
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label htmlFor="hearAbout">How did you hear about us?</label>
          <textarea
            id="hearAbout"
            className={styles.shortText}
            placeholder="YouTube Ad"
            type="text"
          />
        </div>
        <div className={`${styles.inputWrapper} ${styles.contact}`}>
          <label htmlFor="emergency">Emergency Contact:</label>
          <input id="emergency" placeholder="John Doe" type="text" />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="rely">Relationship:</label>
          <input id="rely" placeholder="Father" type="text" />
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label htmlFor="emergeAddress">Address:</label>
          <input id="emergeAddress" placeholder="Father" type="text" />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="emergePhone">Phone #</label>
          <input id="emergePhone" placeholder="435 544 3953" type="text" />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="emergeWork">Work #</label>
          <input id="emergeWork" placeholder="416 134 5266" type="text" />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="emergeCell">Cell #</label>
          <input id="emergeCell" placeholder="905 562 6353" type="text" />
        </div>
        <hr className={styles.hr}></hr>
        <p className={styles.sectionHeader2}>Medical history</p>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="height">Height</label>
          <input id="height" placeholder={`5'9"`} type="text" />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label htmlFor="weight">Weight (lbs)</label>
          <input id="weight" placeholder="174lbs" type="text" />
        </div>
        <div className={`${styles.inputWrapper} ${styles.physicalExam}`}>
          <label className={styles.physicalExamLabel}>
            When was your last physical exam?
          </label>
          <input id="dateOfPhysical" type="date" name="dateOfPhysical" />
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
                onChange={(e) => switchCheck(e.target, 0)}
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
              <input id="packs" placeholder="1" type="text" />
            </div>
            <div className={`${styles.inputWrapper}`}>
              <label htmlFor="packsHowLong">For how long?</label>
              <input id="packsHowLong" placeholder="1 year" type="text" />
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
                onChange={(e) => switchCheck(e.target, 1)}
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
            <input id="howManyDrinks" placeholder="2" type="text" />
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
                onChange={(e) => switchCheck(e.target, 2)}
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
                onChange={(e) => switchCheck(e.target, 3)}
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
