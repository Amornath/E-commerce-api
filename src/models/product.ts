export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide item name"],
      maxlength: 50,
    },
    description: {
      type: String,
    },
    quantity: {
      type: String,
    },
    sku: {
      type: String,
    },
    price: {
      type: String,
    },

    images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
    weight: {
      type: String,
    },
 
    category: { type: Schema.Types.ObjectId, ref: "Category" },

    video: {
      type: String,
    },

    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
