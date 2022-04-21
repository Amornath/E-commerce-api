export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  // user: { type: Schema.Types.ObjectId, ref: "User" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  message: {
    type: String,
  },
  rating: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Review", schema);
