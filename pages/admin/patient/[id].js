import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import Head from 'next/head';
import styles from '../../../styles/Patient.module.css';
import { useRouter } from 'next/router';
import { AiFillStepBackward } from 'react-icons/ai';
import { server } from '../../../utils/config.js';

const Index = ({ user }) => {
  const router = useRouter();

  let date = new Date(user.createdAt);
  console.log(user);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>
      <Head>
        <title>Admin</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0;"
        />
      </Head>
      <div className={styles.container}>
        <button onClick={() => router.push('/admin')}>
          <AiFillStepBackward /> Back
        </button>
        <div className={styles.userWrapper}>
          <h3>
            {user.screeningData.firstName} {user.screeningData.lastName}{' '}
          </h3>
          <div className={styles.innerWrapper}>
            <p className={styles.wrapperHeader}>Screening Data</p>
            <p>
              <span>Date of visit:</span> {user.screeningData.dateOfVisit}
            </p>
            <p>
              <span>Symptoms:</span>{' '}
              {user.screeningData.anySymptoms
                ? capitalizeFirstLetter(user.screeningData.anySymptoms)
                : ''}
            </p>
            <p>
              <span>Call to isolate:</span>{' '}
              {capitalizeFirstLetter(user.screeningData.CallToIsolate)}
            </p>
            <p>
              <span>Positive test:</span>{' '}
              {capitalizeFirstLetter(user.screeningData.covidPositive)}
            </p>
            <p>
              <span>Older & experiencing symptoms: </span>
              {capitalizeFirstLetter(user.screeningData.olderAndExpSym)}
            </p>
            <p>
              <span>Positive Rapid:</span>{' '}
              {capitalizeFirstLetter(user.screeningData.positiveRapid)}
            </p>
            <p>
              <span>Proof of vaccine: </span>
              {user.screeningData.proofOfVaccine
                ? capitalizeFirstLetter(user.screeningData.proofOfVaccine)
                : ''}
            </p>
          </div>
          <div className={styles.innerWrapper}>
            <p className={styles.wrapperHeader}>Registry Data</p>
            <p>
              <span>Full Name:</span>{' '}
              {capitalizeFirstLetter(user.registryData.fullName)}
            </p>
            <p>
              <span>Gender:</span>{' '}
              {capitalizeFirstLetter(user.registryData.sex)}
            </p>
            <p>
              <span>Age:</span> {user.registryData.age}
            </p>
            <p>
              <span>Occupation:</span>{' '}
              {capitalizeFirstLetter(user.registryData.occupation)}
            </p>
            <p>
              <span>Marital Status:</span>{' '}
              {capitalizeFirstLetter(user.registryData.maritalStat)}
            </p>
            <p>
              <span>Email:</span>{' '}
              {capitalizeFirstLetter(user.registryData.email)}
            </p>
            <p>
              <span>Date of Birth:</span> {user.registryData.DOB}
            </p>
            <p>
              <span>Address:</span>{' '}
              {capitalizeFirstLetter(user.registryData.address)}
            </p>
            <p>
              <span>Cell number:</span> {user.registryData.cellNum}
            </p>
            <p>
              <span>Home number:</span> {user.registryData.homeNum}
            </p>
            <p>
              <span>Home number:</span> {user.registryData.homeNum}
            </p>
            <p className={styles.hrHeader}>Medical History</p>
            <p>
              <span>Height:</span> {user.registryData.medicalHistory.height} cm
            </p>
            <p>
              <span>Weight:</span> {user.registryData.medicalHistory.weight} lbs
            </p>
            <p>
              <span>Last Physical:</span>{' '}
              {user.registryData.medicalHistory.lastPhysical}
            </p>
            <p>
              <span>Allergies:</span>{' '}
              {capitalizeFirstLetter(
                user.registryData.medicalHistory.allergies
              )}
            </p>
            <p>
              <span>Active Medications:</span>{' '}
              {user.registryData.medicalHistory.activeMedications
                ? capitalizeFirstLetter(
                    user.registryData.medicalHistory.activeMedications
                  )
                : 'Left Blank'}
            </p>
            <p>
              <span>Active Herbal Supplements:</span>{' '}
              {user.registryData.medicalHistory.activeHerbalSups
                ? capitalizeFirstLetter(
                    user.registryData.medicalHistory.activeHerbalSups
                  )
                : 'Left Blank'}
            </p>
            <p>
              <span>Previous Cosmetics:</span>{' '}
              {user.registryData.medicalHistory.previousCosmetics
                ? capitalizeFirstLetter(
                    user.registryData.medicalHistory.previousCosmetics
                  )
                : 'Left Blank'}
            </p>{' '}
            <p>
              <span>Medical Conditions:</span>{' '}
              {user.registryData.medicalHistory.medicalConditions.symptoms
                .length == 0
                ? 'No conditions'
                : user.registryData.medicalHistory.medicalConditions.symptoms.map(
                    (cond) => {
                      return <>{cond} </>;
                    }
                  )}
            </p>
            <p>
              <span>Other Conditions:</span>{' '}
              {user.registryData.medicalHistory.medicalConditions
                .otherConditions
                ? capitalizeFirstLetter(
                    user.registryData.medicalHistory.medicalConditions
                      .otherConditions
                  )
                : 'Left Blank'}
            </p>{' '}
            <p>
              <span>Alcohol Drinker:</span>{' '}
              {user.registryData.medicalHistory.alcoholDrinker
                ? capitalizeFirstLetter(
                    user.registryData.medicalHistory.alcoholDrinker
                  )
                : ''}
            </p>
            <p>
              <span>Smoker:</span>{' '}
              {user.registryData.medicalHistory.smoker
                ? capitalizeFirstLetter(user.registryData.medicalHistory.smoker)
                : ''}
            </p>
            <p>
              <span>Staph:</span>{' '}
              {capitalizeFirstLetter(user.registryData.medicalHistory.staph)}
            </p>
            <p className={styles.hrHeader}>Emergency Contact</p>
            <p>
              <span>Full Name:</span>{' '}
              {capitalizeFirstLetter(
                user.registryData.emergencyContact.fullName
              )}
            </p>
            <p>
              <span>Relationship:</span>{' '}
              {capitalizeFirstLetter(
                user.registryData.emergencyContact.relationship
              )}
            </p>
            <p>
              <span>Address:</span>{' '}
              {capitalizeFirstLetter(
                user.registryData.emergencyContact.address
              )}
            </p>
            <p>
              <span>Cell Number:</span>{' '}
              {capitalizeFirstLetter(
                user.registryData.emergencyContact.cellNum
              )}
            </p>
            <p>
              <span>Phone Num:</span>{' '}
              {capitalizeFirstLetter(
                user.registryData.emergencyContact.phoneNum
              )}
            </p>
            <p>
              <span>Work Number:</span>{' '}
              {capitalizeFirstLetter(
                user.registryData.emergencyContact.workNum
              )}
            </p>
            <hr></hr>
            <p>
              <span>Reason For Consult:</span>{' '}
              {capitalizeFirstLetter(user.registryData.reasonForConsult)}
            </p>
            <p>
              <span>How did you hear about us?</span>{' '}
              {capitalizeFirstLetter(user.registryData.hearAboutUs)}
            </p>
            <p>
              <span>Date:</span> {user.registryData.date}
            </p>
            <Image
              src={user.registryData.signature}
              width={300}
              height={175}
              alt=""
            ></Image>
          </div>

          <p>Records added at {date.toDateString()}</p>
        </div>
      </div>
    </>
  );
};

export default Index;

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`${server}/api/patients/${params.id}`);
  return {
    props: {
      user: res.data,
    },
  };
};
