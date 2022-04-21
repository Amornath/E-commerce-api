export {};
const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    street1: {
      type: String,
    },
    street2: {
      type: String,
    },

    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
    country: {
      type: String,
    },
    phone: {
      type: String,
    },
    company: {
      type: String,
    },
    name: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
