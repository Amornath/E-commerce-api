export {};
const Film = require("../models/film");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllFilms = async (req: any, res: any) => {
  let page = parseInt(req.query.page);
  let limit = parseInt(req.query.limit);

  if (!page) {
    // Make the Default value one
    page = 1;
  }

  if (!limit) {
    limit = 10;
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {
    next: {},
    previous: {},
    films: [],
  };

  if (endIndex < (await Film.countDocuments().exec())) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  results.films = await Film.find().limit(limit).skip(startIndex).exec();
  // const items = await Film.find().sort("createdAt");
  res.status(StatusCodes.OK).json({ results });
};

const getFilm = async (req: any, res: any) => {
  try {
    // Find  by id
    let film = await Film.findById(req.params.id);
    res.json(film);
  } catch (err) {
    console.log(err);
  }
};

const createFilm = async (req: any, res: any) => {
  let obj = new Film({
    name: req.body.name,
    image: req.body.image,
    trailerLink: req.body.trailerLink,
    videoLink: req.body.videoLink,
    genre: req.body.genre,
    actors: req.body.actors,
    directors: req.body.directors,
    casting: req.body.casting,
    movieLength: req.body.movieLength,
  });

  obj
    .save()
    .then((response: any) => {
      res.json({
        message: "Data added successfully",
      });
    })
    .catch((err: any) => {
      res.json({
        message: "Error occured",
      });
    });
};

const updateFilm = async (req: any, res: any) => {
  try {
    let film = await Film.findById(req.params.id);

    const data = {
      name: req.body.name || film.name,
      image: req.body.image || film.image,
      trailerLink: req.body.trailerLink || film.trailerLink,
      videoLink: req.body.videoLink || film.videoLink,
      genre: req.body.genre || film.genre,
      actors: req.body.actors || film.actors,
      directors: req.body.directors || film.directors,
      casting: req.body.casting || film.casting,
      movieLength: req.body.movieLength || film.movieLength,
    };
    film = await Film.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(film);
  } catch (err) {
    throw new BadRequestError(`${err}`);
  }
};

const deleteFilm = async (req: any, res: any) => {
  try {
    // Find by id
    let film = await Film.findById(req.params.id);

    // Delete from db
    await film.remove();
    res.json(film);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createFilm,
  deleteFilm,
  getAllFilms,
  updateFilm,
  getFilm,
};
