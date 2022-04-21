export {};
const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./custom-api");

class NotFoundError extends CustomAPIError {
  constructor(message: any) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
