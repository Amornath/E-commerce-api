export {};
class CustomAPIError extends Error {
  constructor(message: any) {
    super(message);
  }
}

module.exports = CustomAPIError;
