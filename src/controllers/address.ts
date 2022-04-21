export {};
const Address = require("../models/address");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllAddress = async (req: any, res: any) => {
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
    addresses: [],
  };

  if (endIndex < (await Address.countDocuments().exec())) {
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
  results.addresses = await Address.find().limit(limit).skip(startIndex).exec();
  // const items = await Address.find().sort("createdAt");
  res.status(StatusCodes.OK).json({ results });
};

const getAddress = async (req: any, res: any) => {
  try {
    // Find  by id
    let address = await Address.findById(req.params.id);

    res.json({ Address: address });
  } catch (err) {
    console.log(err);
  }
};

const createAddress = async (req: any, res: any) => {
  try {
    // Create new address
    let address = new Address({
      street1: req.body.street1,
      street2: req.body.street2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      company: req.body.company,
      name: req.body.name,
    });
    // Save address
    await address.save();
    res.json(address);
  } catch (err) {
    throw new BadRequestError(`${err}`);
  }
};

const updateAddress = async (req: any, res: any) => {
  try {
    let address = await Address.findById(req.params.id);

    const data = {
      street1: req.body.street1 || address.street1,
      street2: req.body.street2 || address.street2,
      city: req.body.city || address.city,
      state: req.body.state || address.state,
      zip: req.body.zip || address.zip,
      country: req.body.country || address.country,
      phone: req.body.phone || address.phone,
      company: req.body.company || address.company,
      name: req.body.name || address.name,

      // cloudinary_id: result?.public_id || address.cloudinary_id,
    };
    address = await Address.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.json(address);
  } catch (err) {
    throw new BadRequestError(`${err}`);
  }
};

const deleteAddress = async (req: any, res: any) => {
  try {
    // Find by id
    let address = await Address.findById(req.params.id);

    await address.remove();
    res.json(address);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createAddress,
  deleteAddress,
  getAllAddress,
  updateAddress,
  getAddress,
};
