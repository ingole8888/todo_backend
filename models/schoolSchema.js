const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
  {
    urn: {
      type: String,
      required: true,
    },
    laCode: {
      type: Number,
      require: false,
    },
    laName: {
      type: String,
      require: false,
    },
    name: {
      type: String,
      required: true,
    },
    typeOfEstablishment: {
      type: String,
      required: false,
    },
    establishmentStatus: {
      type: String,
      required: false,
    },
    statutoryLowAge: {
      type: Number,
      required: false,
    },
    statutoryHighAge: {
      type: Number,
      required: false,
    },
    boarders: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    admissionsPolicy: {
      type: String,
      require: false,
    },
    schoolCapacity: {
      type: Number,
      required: false,
    },
    numberOfPupils: {
      type: Number,
      required: false,
    },
    numberOfBoys: {
      type: Number,
      required: false,
    },
    numberOfGirls: {
      type: Number,
      required: false,
    },
    ofstedLastInsp: {
      type: String,
      required: false,
    },
    ofstedRating: {
      type: String,
      required: false,
    },
    street: {
      type: String,
      required: false,
    },
    locality: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    town: {
      type: String,
      required: false,
    },
    county: {
      type: String,
      required: false,
    },
    postcode: {
      type: String,
      required: false,
    },
    region: {
      type: String,
      required: false,
    },
    schoolWebsite: {
      type: String,
      required: false,
    },
    telephoneNum: {
      type: String,
      required: false,
    },
    headTitle: {
      type: String,
      required: false,
    },
    headFirstName: {
      type: String,
      required: false,
    },
    headLastName: {
      type: String,
      required: false,
    },
    headPreferredJobTitle: {
      type: String,
      required: false,
    },
    latitude: {
      type: String,
      required: false,
    },
    longitude: {
      type: String,
      required: false,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: false,
      },
      coordinates: {
        type: [Number],
        required: false,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    finalSlug: {
      type: String,
      required: false,
    },
    oldSlug: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const School = mongoose.model("School", schoolSchema);
// const School2024 = mongoose.model("schools2024", schoolSchema, "schools2024");

module.exports = School;
