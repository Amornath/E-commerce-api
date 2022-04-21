export {};
const Review = require("../models/review");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllReview = async (req: any, res: any) => {
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
    reviews: [],
  };

  if (endIndex < (await Review.countDocuments().exec())) {
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
  results.reviews = await Review.find().limit(limit).skip(startIndex).exec();
  // const items = await Review.find().sort("createdAt");
  res.status(StatusCodes.OK).json({ results });
};

const getReview = async (req: any, res: any) => {
  try {
    // Find  by id
    let review = await Review.findById(req.params.id);

    res.json({ Review: review });
  } catch (err) {
    console.log(err);
  }
};

const createReview = async (req: any, res: any) => {
  try {
    // Create new review
    let review = new Review({
      user: req.body.user,
      product: req.body.product,
      message: req.body.message,
      ratting: req.body.ratting,
    });
    // Save review
    await review.save();
    res.json(review);
  } catch (err) {
    throw new BadRequestError(`${err}`);
  }
};

const deleteReview = async (req: any, res: any) => {
  try {
    // Find by id
    let review = await Review.findById(req.params.id);

    await review.remove();
    res.json(review);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createReview,
  deleteReview,
  getAllReview,

  getReview,
};
