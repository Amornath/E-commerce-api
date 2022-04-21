export {};
const Category = require("../models/category");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllCategory = async (req: any, res: any) => {
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
    categories: [],
  };

  if (endIndex < (await Category.countDocuments().exec())) {
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
  results.categories = await Category.find()
    .limit(limit)
    .skip(startIndex)
    .exec();
  // const items = await Category.find().sort("createdAt");
  res.status(StatusCodes.OK).json({ results });
};

const getCategory = async (req: any, res: any) => {
  try {
    // Find  by id
    let category = await Category.findById(req.params.id);

    res.json({ Category: category });
  } catch (err) {
    console.log(err);
  }
};

const createCategory = async (req: any, res: any) => {
  try {
    // Create new category
    let category = new Category({
      name: req.body.name,
      description: req.body.description,
    });
    // Save category
    await category.save();
    res.json(category);
  } catch (err) {
    throw new BadRequestError(`${err}`);
  }
};

const updateCategory = async (req: any, res: any) => {
  try {
    let category = await Category.findById(req.params.id);

    const data = {
      name: req.body.name || category.name,
      description: req.body.description || category.description,

      // cloudinary_id: result?.public_id || category.cloudinary_id,
    };
    category = await Category.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(category);
  } catch (err) {
    throw new BadRequestError(`${err}`);
  }
};

const deleteCategory = async (req: any, res: any) => {
  try {
    // Find by id
    let category = await Category.findById(req.params.id);

    await category.remove();
    res.json(category);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
  getCategory,
};
