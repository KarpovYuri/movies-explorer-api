const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');
const { serverErrorCode, serverErrorMessage } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    const error = new BadRequestError();
    res.status(error.statusCode).send({ message: error.message });
    return;
  }

  if (err.code === 11000) {
    const error = new ConflictError();
    res.status(error.statusCode).send({ message: error.message });
    return;
  }

  const { statusCode = serverErrorCode, message } = err;
  res.status(statusCode).send({
    message: statusCode === serverErrorCode ? serverErrorMessage : message,
  });
  next();
};

module.exports = errorHandler;
