const { conflictErrorCode, conflictErrorMessage } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message = conflictErrorMessage) {
    super(message);
    this.statusCode = conflictErrorCode;
    this.message = message;
  }
}

module.exports = ConflictError;
