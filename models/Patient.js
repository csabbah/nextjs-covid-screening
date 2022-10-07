import mongoose, { Mongoose } from 'mongoose';

const PatientSchema = new mongoose.Schema(
  {
    screeningData: {
      type: {
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        dateOfVisit: {
          type: String,
        },
        proofOfVaccine: {
          // Accept any type of data whether a single String, Array or Object
          type: mongoose.Schema.Types.Mixed,
        },
        positiveRapid: {
          type: String,
        },
        CallToIsolate: {
          type: String,
        },
        anySymptoms: {
          type: mongoose.Schema.Types.Mixed,
        },
        covidPositive: {
          type: String,
        },
        olderAndExpSym: {
          type: String,
        },
      },
    },
    registryData: {
      type: {
        fullName: {
          type: String,
        },
        age: {
          type: String,
        },
        sex: { type: String },
        address: { type: String },
        DOB: { type: String },
        homeNum: { type: String },
        workNum: { type: String },
        cellNum: { type: String },
        email: { type: String },
        occupation: { type: String },
        maritalStat: { type: String },
        reasonForConsult: { type: String },
        hearAboutUs: { type: String },
        emergencyContact: {
          fullName: { type: String },
          relationship: { type: String },
          address: { type: String },
          phoneNum: { type: String },
          workNum: { type: String },
          cellNum: { type: String },
        },
        medicalHistory: {
          height: { type: String },
          weight: { type: String },
          lastPhysical: { type: String },
          smoker: { type: mongoose.Schema.Types.Mixed },
          alcoholDrinker: {
            type: mongoose.Schema.Types.Mixed,
          },
          previousCosmetics: { type: String },
          activeMedications: { type: String },
          activeHerbalSups: { type: String },
          medicalConditions: {
            type: mongoose.Schema.Types.Mixed,
          },
          allergies: { type: String },
          staph: { type: String },
        },
        signature: { type: String },
        date: { type: String },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Patient ||
  mongoose.model('Patient', PatientSchema);
