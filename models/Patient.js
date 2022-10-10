import mongoose, { Mongoose } from 'mongoose';

const PatientSchema = new mongoose.Schema(
  {
    screeningData: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        dateOfVisit: {
          type: String,
          required: true,
        },
        proofOfVaccine: {
          // Accept any type of data whether a single String, Array or Object
          type: mongoose.Schema.Types.Mixed,
          required: true,
        },
        positiveRapid: {
          type: String,
          required: true,
        },
        CallToIsolate: {
          type: String,
          required: true,
        },
        anySymptoms: {
          type: mongoose.Schema.Types.Mixed,
          required: true,
        },
        covidPositive: {
          type: String,
          required: true,
        },
        olderAndExpSym: {
          type: String,
          required: true,
        },
      },
    },
    registryData: {
      type: {
        fullName: {
          type: String,
          required: true,
        },
        age: {
          type: String,
          required: true,
        },
        sex: { type: String, required: true },
        address: { type: String, required: true },
        DOB: { type: String, required: true },
        homeNum: { type: String, required: true },
        workNum: { type: String, required: true },
        cellNum: { type: String, required: true },
        email: { type: String, required: true },
        occupation: { type: String, required: true },
        maritalStat: { type: String, required: true },
        reasonForConsult: { type: String, required: true },
        hearAboutUs: { type: String, required: true },
        emergencyContact: {
          fullName: { type: String, required: true },
          relationship: { type: String, required: true },
          address: { type: String, required: true },
          phoneNum: { type: String, required: true },
          workNum: { type: String, required: true },
          cellNum: { type: String, required: true },
        },
        medicalHistory: {
          height: { type: String, required: true },
          weight: { type: String, required: true },
          lastPhysical: { type: String, required: true },
          smoker: { type: mongoose.Schema.Types.Mixed, required: true },
          alcoholDrinker: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
          },
          previousCosmetics: { type: String },
          activeMedications: { type: String },
          activeHerbalSups: { type: String },
          medicalConditions: {
            type: mongoose.Schema.Types.Mixed,
          },
          allergies: { type: String, required: true },
          staph: { type: String, required: true },
        },
        signature: { type: String, required: true },
        date: { type: String, required: true },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Patient ||
  mongoose.model('Patient', PatientSchema);
