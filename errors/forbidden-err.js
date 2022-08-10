const { forbiddenErrorCode, forbiddenErrorMessage } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message = forbiddenErrorMessage) {
    super(message);
    this.statusCode = forbiddenErrorCode;
    this.message = message;
  }
}

module.exports = ForbiddenError;
