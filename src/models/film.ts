export {};
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const FilmSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    trailerLink: {
      type: String,
    },
    videoLink: {
      type: String,
    },
    genre: { type: Schema.Types.ObjectId, ref: "Genre" },
    actors: [{ type: Schema.Types.ObjectId, ref: "People" }],
    directors: [{ type: Schema.Types.ObjectId, ref: "People" }],
    casting: {
      type: String,
    },
    movieLength: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Film", FilmSchema);
