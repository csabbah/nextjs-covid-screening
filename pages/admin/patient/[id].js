import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Head from 'next/head';
import styles from '../../../styles/Patient.module.css';
import { useRouter } from 'next/router';
import { AiFillStepBackward } from 'react-icons/ai';
import { server } from '../../../utils/config.js';
import Navbar from '../../../components/Navbar';

const Index = ({ user }) => {
  const router = useRouter();

  let date = new Date(user.createdAt);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  let {
    firstName,
    lastName,
    dateOfVisit,
    anySymptoms,
    CallToIsolate,
    covidPositive,
    olderAndExpSym,
    positiveRapid,
    proofOfVaccine,
  } = user.screeningData;

  let {
    fullName,
    sex,
    age,
    occupation,
    maritalStat,
    email,
    DOB,
    address,
    cellNum,
    workNum,
    homeNum,
    reasonForConsult,
    hearAboutUs,
    date: rgDate,
    signature,
  } = user.registryData;

  let {
    height,
    weight,
    lastPhysical,
    allergies,
    activeMedications,
    activeHerbalSups,
    previousCosmetics,
    smoker,
    alcoholDrinker,
    staph,
  } = user.registryData.medicalHistory;

  let {
    fullName: ecfullName,
    relationship,
    address: ecAddress,
    cellNum: ecCellNum,
    phoneNum,
    workNum: ecWorkNum,
  } = user.registryData.emergencyContact;

  return (
    <>
      <Head>
        <title>Admin</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0;"
        />
      </Head>
      <Navbar boolean={true} header={'Patient Information'} />
      <div className={styles.container}>
        <button onClick={() => router.push('/admin')}>
          <AiFillStepBackward /> Back
        </button>
        <div className={styles.userWrapper}>
          <div className={styles.innerWrapper}>
            <p className={styles.wrapperHeader}>Screening Data</p>
            <p>
              <span>Patient:</span> {firstName} {lastName}
            </p>

            <p>
              <span>Date of visit:</span> {dateOfVisit}
            </p>
            <p>
              <span>Symptoms:</span>
              {anySymptoms == 'no'
                ? capitalizeFirstLetter(anySymptoms)
                : anySymptoms.map((sym, i) => {
                    return (
                      <span style={{ color: 'rgba(128,128,128)' }} key={i}>
                        {sym}
                      </span>
                    );
                  })}
            </p>
            <p>
              <span>Call to isolate:</span>{' '}
              {capitalizeFirstLetter(CallToIsolate)}
            </p>
            <p>
              <span>Positive test:</span> {capitalizeFirstLetter(covidPositive)}
            </p>
            <p>
              <span>Older & experiencing symptoms: </span>
              {capitalizeFirstLetter(olderAndExpSym)}
            </p>
            <p>
              <span>Positive Rapid:</span>{' '}
              {capitalizeFirstLetter(positiveRapid)}
            </p>
            <p>
              {typeof proofOfVaccine == 'object' ? (
                ''
              ) : (
                <span>Proof of vaccine:</span>
              )}
              {typeof proofOfVaccine == 'object' ? (
                <span className={styles.vaccineWrapper}>
                  Vaccine quantity: {proofOfVaccine.vaccineQuantity}
                  <br></br>Vaccine certificate:
                  <span className={styles.certificateWrapper}>
                    <Image
                      src={proofOfVaccine.certificateFile}
                      width={350}
                      height={150}
                      alt=""
                      objectFit="contain"
                    ></Image>
                    <button>Download</button>
                  </span>
                </span>
              ) : (
                capitalizeFirstLetter(proofOfVaccine)
              )}
            </p>
          </div>
          <div className={styles.innerWrapper}>
            <p className={styles.wrapperHeader}>Registry Data</p>
            <p>
              <span>Full Name:</span> {capitalizeFirstLetter(fullName)}
            </p>
            <p>
              <span>Gender:</span> {capitalizeFirstLetter(sex)}
            </p>
            <p>
              <span>Age:</span> {age}
            </p>
            <p>
              <span>Occupation:</span> {capitalizeFirstLetter(occupation)}
            </p>
            <p>
              <span>Marital Status:</span> {capitalizeFirstLetter(maritalStat)}
            </p>
            <p>
              <span>Email:</span> {capitalizeFirstLetter(email)}
            </p>
            <p>
              <span>Date of Birth:</span> {DOB}
            </p>
            <p>
              <span>Address:</span> {capitalizeFirstLetter(address)}
            </p>
            <p>
              <span>Cell number:</span> {cellNum}
            </p>
            <p>
              <span>Home number:</span> {homeNum}
            </p>
            <p>
              <span>Work number:</span> {workNum}
            </p>
            <p className={styles.hrHeader}>Medical History</p>
            <p>
              <span>Height:</span> {height} cm
            </p>
            <p>
              <span>Weight:</span> {weight} lbs
            </p>
            <p>
              <span>Last Physical:</span> {lastPhysical}
            </p>
            <p>
              <span>Active Medications:</span>{' '}
              {activeMedications
                ? capitalizeFirstLetter(activeMedications)
                : 'Left Blank'}
            </p>
            <p>
              <span>Active Herbal Supplements:</span>{' '}
              {activeHerbalSups
                ? capitalizeFirstLetter(activeHerbalSups)
                : 'Left Blank'}
            </p>
            <p>
              <span>Previous Cosmetics:</span>{' '}
              {previousCosmetics
                ? capitalizeFirstLetter(previousCosmetics)
                : 'Left Blank'}
            </p>{' '}
            <p>
              <span>Other Conditions:</span>{' '}
              {user.registryData.medicalHistory.medicalConditions
                .otherConditions
                ? capitalizeFirstLetter(
                    user.registryData.medicalHistory.medicalConditions
                      .otherConditions
                  )
                : 'Left Blank'}
            </p>
            <p>
              <span>Medical Conditions:</span>{' '}
              {user.registryData.medicalHistory.medicalConditions.symptoms
                .length == 0
                ? 'No conditions'
                : user.registryData.medicalHistory.medicalConditions.symptoms.map(
                    (cond, i) => {
                      return (
                        <span style={{ color: 'rgba(128,128,128)' }} key={i}>
                          {cond}
                        </span>
                      );
                    }
                  )}
            </p>
            <p>
              <span>Alcohol Drinker:</span>{' '}
              {typeof alcoholDrinker == 'string'
                ? capitalizeFirstLetter(alcoholDrinker)
                : `Yes, ${alcoholDrinker.howManyDrinks} ${
                    alcoholDrinker.howManyDrinks < 2 ? 'drink' : 'drinks'
                  } a week`}
            </p>
            <p>
              <span>Smoker:</span>{' '}
              {typeof smoker == 'string'
                ? capitalizeFirstLetter(smoker)
                : `Yes, ${smoker.packsPerDay} ${
                    smoker.packsPerDay < 2 ? 'pack' : 'packs'
                  } a day and has been smoking for ${smoker.howLong} ${
                    smoker.howLong < 2 ? 'year' : 'years'
                  }`}
            </p>
            <p>
              <span>Allergies:</span> {capitalizeFirstLetter(allergies)}
            </p>
            <p>
              <span>Staph:</span> {capitalizeFirstLetter(staph)}
            </p>
            <p className={styles.hrHeader}>Emergency Contact</p>
            <p>
              <span>Full Name:</span> {capitalizeFirstLetter(ecfullName)}
            </p>
            <p>
              <span>Relationship:</span> {capitalizeFirstLetter(relationship)}
            </p>
            <p>
              <span>Address:</span> {capitalizeFirstLetter(ecAddress)}
            </p>
            <p>
              <span>Cell Number:</span> {capitalizeFirstLetter(ecCellNum)}
            </p>
            <p>
              <span>Phone Num:</span> {capitalizeFirstLetter(phoneNum)}
            </p>
            <p>
              <span>Work Number:</span> {capitalizeFirstLetter(ecWorkNum)}
            </p>
            <hr></hr>
            <p>
              <span>Reason For Consult:</span>{' '}
              {capitalizeFirstLetter(reasonForConsult)}
            </p>
            <p>
              <span>How did you hear about us?</span>{' '}
              {capitalizeFirstLetter(hearAboutUs)}
            </p>
            <p>
              <span>Date:</span> {rgDate}
            </p>
            <Image src={signature} width={300} height={175} alt=""></Image>
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
