export {};
const Order = require("../models/order");
const Product = require("../models/product");
const Address = require("../models/address");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllOrders = async (req: any, res: any) => {
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
    orders: [],
  };

  if (endIndex < (await Order.countDocuments().exec())) {
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
  results.orders = await Order.find().limit(limit).skip(startIndex).exec();
  // const items = await Order.find().sort("createdAt");
  res.status(StatusCodes.OK).json({ results });
};

const getOrder = async (req: any, res: any) => {
  try {
    // Find  by id
    let order = await Order.findById(req.params.id);
    let shipping_address;
    let price = 0;
    await Promise.all(
      order.products.map(async (ele: any) => {
        shipping_address = await Address.findById(order.address);
        let product = await Product.findById(ele);
        price += Number(product.price);
        // console.log("price", product.price); // first 12 second 9
        // console.log(Number(price)); // first 12 second 21
      })
    );
    res.json({
      Order: order,
      TotalPrice: Number(price),
      shipping_address: shipping_address,
    });
  } catch (err) {
    console.log(err);
  }
};

const createOrder = async (req: any, res: any) => {
  try {
    // Create new order
    let order = new Order({
      user: req.body.user,
      products: req.body.products,
      movies: req.body.movies,
      address: req.body.address,
      trackingID: req.body.trackingID,
    });
    // Save order
    await order.save();
    res.json(order);
  } catch (err) {
    throw new BadRequestError(`${err}`);
  }
};

const updateOrder = async (req: any, res: any) => {
  try {
    let order = await Order.findById(req.params.id);

    const data = {
      products: req.body.products || order.products,
      movies: req.body.movies || order.movies,
      paid: req.body.paid || order.paid,
      address: req.body.address || order.address,
      trackingID: req.body.trackingID || order.trackingID,

      // cloudinary_id: result?.public_id || order.cloudinary_id,
    };
    order = await Order.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(order);
  } catch (err) {
    throw new BadRequestError(`${err}`);
  }
};

const deleteOrder = async (req: any, res: any) => {
  try {
    // Find by id
    let order = await Order.findById(req.params.id);

    await order.remove();
    res.json(order);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createOrder,
  deleteOrder,
  getAllOrders,
  updateOrder,
  getOrder,
};
