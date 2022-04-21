export {};
const express = require("express");

const router = express.Router();
const {
  createFilm,
  deleteFilm,
  getAllFilms,
  updateFilm,
  getFilm,
} = require("../controllers/film");

router.route("/").post(createFilm).get(getAllFilms);

router.route("/:id").get(getFilm).delete(deleteFilm).put(updateFilm);

module.exports = router;
