export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  // user: { type: Schema.Types.ObjectId, ref: "User" },
  user: { type: Object },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  movies: [{ type: Schema.Types.ObjectId, ref: "Film" }],
  address: { type: Schema.Types.ObjectId, ref: "Address" },
  trackingID: { type: String },
  paid: { type: Boolean, default: false },
});

module.exports = mongoose.model("Order", schema);
