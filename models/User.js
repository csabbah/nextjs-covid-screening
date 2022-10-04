import mongoose, { Mongoose } from 'mongoose';

const UserSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
