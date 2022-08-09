const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');

const { DEV_SECRET } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new AuthError());
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV !== 'production' ? DEV_SECRET : JWT_SECRET);
  } catch (err) {
    return next(new AuthError());
  }
  req.user = payload;
  return next();
};

module.exports = auth;
