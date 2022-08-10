const { badRequestErrorCode, badRequestErrorMessage } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message = badRequestErrorMessage) {
    super(message);
    this.statusCode = badRequestErrorCode;
    this.message = message;
  }
}

module.exports = BadRequestError;
