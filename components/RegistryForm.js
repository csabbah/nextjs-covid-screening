import React, { useState } from 'react';
import styles from '../styles/RegistryForm.module.css';
import { useRouter } from 'next/router';
import SignatureCanvas from 'react-signature-canvas';
import Image from 'next/image';

const RegistryForm = ({ formData }) => {
  const router = useRouter();

  const handleSecondSubmit = (e) => {
    e.preventDefault();

    // Save data to formData state, create User model then redirect to a different route saying submission completed!

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

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => handleSecondSubmit(e)} className={styles.form}>
        <p className={styles.sectionHeader}>patient registration form</p>
        <div className={`${styles.inputWrapper}`}>
          <label>Full Name:</label>
          <input placeholder="John Doe" type="text" />
        </div>
        <div className={`${styles.inputWrapper} ${styles.age}`}>
          <label>Age:</label>
          <input placeholder="29" type="number" />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label>Sex:</label>
          <select>
            <option defaultChecked="Select">Choose...</option>
            <option label="Male" name="male"></option>
            <option label="Female" name="female"></option>
            <option label="Non-binary" name="female"></option>
          </select>
        </div>
        <div className={`${styles.inputWrapper} ${styles.medCol}`}>
          <label>Address:</label>
          <input placeholder="26 Jeannette Pl" type="text" />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label>DOB:</label>
          <input placeholder="" type="text" />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label>Home #</label>
          <input placeholder="435 544 3953" type="text" />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label>Work #</label>
          <input placeholder="416 134 5266" type="text" />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label>Cell #</label>
          <input placeholder="905 562 6353" type="text" />
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label>E-mail:</label>
          <input placeholder="Youremail@gmail.com" type="text" />
        </div>
        <div className={`${styles.inputWrapper} ${styles.medCol}`}>
          <label>Occupation:</label>
          <input placeholder="Web Developer" type="text" />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label>Marital Status</label>
          <select>
            <option defaultChecked="Select">Choose...</option>
            <option label="Married" name="married"></option>
            <option label="Single" name="single"></option>
            <option label="Divorced" name="divorced"></option>
            <option label="Widow" name="widow"></option>
            <option label="Prefer not to say" name="prefer-not-to-say"></option>
          </select>
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label>Reason for consultation/Areas of concern:</label>
          <textarea placeholder="Need more inquiry" type="text" />
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label>How did you hear about us?</label>
          <textarea
            className={styles.shortText}
            placeholder="YouTube Ad"
            type="text"
          />
        </div>
        <div className={`${styles.inputWrapper} ${styles.contact}`}>
          <label>Emergency Contact:</label>
          <input placeholder="John Doe" type="text" />
        </div>
        <div className={styles.inputWrapper}>
          <label>Relationship:</label>
          <input placeholder="Father" type="text" />
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label>Address:</label>
          <input placeholder="Father" type="text" />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label>Phone #</label>
          <input placeholder="435 544 3953" type="text" />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label>Work #</label>
          <input placeholder="416 134 5266" type="text" />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label>Cell #</label>
          <input placeholder="905 562 6353" type="text" />
        </div>
        <hr className={styles.hr}></hr>
        <p className={styles.sectionHeader2}>Medical history</p>
        <div className={`${styles.inputWrapper}`}>
          <label>Height</label>
          <input placeholder={`5'9"`} type="text" />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label>Weight (lbs)</label>
          <input placeholder="174lbs" type="text" />
        </div>
        <div className={`${styles.inputWrapper} ${styles.physicalExam}`}>
          <label className={styles.physicalExamLabel}>
            When was your last physical exam?
          </label>
          <input type="date" id="dateOfPhysical" name="dateOfPhysical" />
        </div>
        <div className={`${styles.inputWrapper} ${styles.smoke}`}>
          <label>Do you smoke?</label>
          <div className={styles.checkboxWrapper}>
            <div>
              <input className={styles.yesCheckbox} type="checkbox" />
              <label>Yes</label>
            </div>
            <div>
              <input className={styles.noCheckbox} type="checkbox" />
              <label>No</label>
            </div>
          </div>
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label>How many packs a day?</label>
          <input placeholder="1" type="text" />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label>For how long?</label>
          <input placeholder="1 year" type="text" />
        </div>
        <div className={`${styles.inputWrapper} ${styles.alcohol}`}>
          <label>Do you drink alcohol?</label>
          <div className={styles.checkboxWrapper}>
            <div>
              <input className={styles.yesCheckbox} type="checkbox" />
              <label>Yes</label>
            </div>
            <div>
              <input className={styles.noCheckbox} type="checkbox" />
              <label>No</label>
            </div>
          </div>
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label>How many drinks a week?</label>
          <input placeholder="2" type="text" />
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label>
            Have you ever had any previous cosmetic or surgical procedures? If
            yes describe
          </label>
          <textarea
            placeholder="Year, procedure, surgeon, city and so forth"
            type="text"
          />
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label>
            Please list all the medications that you take and for what purpose:
          </label>
          <textarea
            className={styles.shortText}
            placeholder="I take this medication for this reason..."
            type="text"
          />
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label>
            Please list all the herbal supplements that you take and for what
            purpose:
          </label>
          <textarea
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
              <input className={styles.yesCheckbox} type="checkbox" />
              <label>Yes</label>
            </div>
            <div>
              <input className={styles.noCheckbox} type="checkbox" />
              <label>No</label>
            </div>
          </div>
          <label>What medication and describe the reaction:</label>
          <textarea
            className={styles.shorterText}
            placeholder="I take the medication and this is the reaction..."
            type="text"
          />
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          <label>Have you ever had a Staph/MRSA infection in the past?</label>
          <div className={styles.checkboxWrapper}>
            <div>
              <input className={styles.yesCheckbox} type="checkbox" />
              <label>Yes</label>
            </div>
            <div>
              <input className={styles.noCheckbox} type="checkbox" />
              <label>No</label>
            </div>
          </div>
          <label>
            Please indicate where on your body the infection was located and
            how/when it was treated:
          </label>
          <textarea
            className={styles.shorterText}
            placeholder="The infection is located here and this is how i treated it..."
            type="text"
          />
        </div>
        <div className={`${styles.inputWrapper} ${styles.fullCol}`}>
          I confirm that the above is true and accurate to the best of my
          knowledge.
        </div>
        <div className={`${styles.inputWrapper} ${styles.medCol}`}>
          <label>Signature</label>
          <SignatureCanvas
            penColor="black"
            backgroundColor="rgba(0,0,0, 0.1)"
            ref={(ref) => {
              captureSignature = ref;
            }}
            canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
          />
        </div>
        <div className={`${styles.inputWrapper}`}>
          <label>Date</label>
          <input type="date" id="dateOfSignature" name="dateOfSignature" />
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
