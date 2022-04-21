export {};
const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    source: {
      type: String,
    },
    alt: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Image = mongoose.model("Image", ImageSchema);

const GenreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Genre = mongoose.model("Genre", GenreSchema);

const PeopleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    info: {
      type: String,
    },
  },
  { timestamps: true }
);

export const People = mongoose.model("People", PeopleSchema);
