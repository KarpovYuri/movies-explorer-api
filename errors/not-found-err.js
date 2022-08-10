const { notFoundErrorCode, notFoundErrorMessage } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message = notFoundErrorMessage) {
    super(message);
    this.statusCode = notFoundErrorCode;
    this.message = message;
  }
}

module.exports = NotFoundError;
