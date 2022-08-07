const { authErrorCode, authErrorMessage } = require('../utils/constants');

class AuthError extends Error {
  constructor(message = authErrorMessage) {
    super(message);
    this.statusCode = authErrorCode;
    this.message = message;
  }
}

module.exports = AuthError;
