export {};
const Product = require("../models/product");
const Review = require("../models/review");
const cloudinary = require("../middleware/cloudinary");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllProducts = async (req: any, res: any) => {
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
    products: [],
  };

  if (endIndex < (await Product.countDocuments().exec())) {
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
  results.products = await Product.find().limit(limit).skip(startIndex).exec();
  // const items = await Product.find().sort("createdAt");
  res.status(StatusCodes.OK).json({ results });
};

const getProduct = async (req: any, res: any) => {
  try {
    // Find  by id
    let review;
    let product = await Product.findById(req.params.id);
    await Promise.all((review = await Review.find({ product: req.params.id })));
    res.json({ product: product, review: review });
  } catch (err) {
    console.log(err);
  }
};

const createProduct = async (req: any, res: any) => {
  try {
    // Upload image to cloudinary
    // const result = await cloudinary.uploader.upload(req.file.path);

    // Create new product
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      price: req.body.price,
      sku: req.body.sku,
      images: req.body.images,
      weight: req.body.width,
      category: req.body.category,
      video: req.body.video,
    });
    // Save user
    await product.save();
    res.json(product);
  } catch (err) {
    throw new BadRequestError(` error ${err}`);
  }
};

const updateProduct = async (req: any, res: any) => {
  try {
    let product = await Product.findById(req.params.id);

    const data = {
      name: req.body.name || product.name,
      description: req.body.description || product.description,
      quantity: req.body.quantity || product.quantity,
      price: req.body.price || product.price,
      sku: req.body.sku || product.sku,
      picture: req.file.path || product.picture,
      length: req.body.length || product.length,
      width: req.body.width || product.width,
      height: req.body.height || product.height,
      category: req.body.category || product.category,
      // cloudinary_id: result?.public_id || product.cloudinary_id,
    };
    product = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(product);
  } catch (err) {
    throw new BadRequestError(`${err}`);
  }
};

const deleteProduct = async (req: any, res: any) => {
  try {
    // Find by id
    let product = await Product.findById(req.params.id);

    await product.remove();
    res.json(product);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  getProduct,
};
