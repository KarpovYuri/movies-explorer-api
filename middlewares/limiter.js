const rateLimit = require('express-rate-limit');
const { limiterMessage } = require('../utils/constants');

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: limiterMessage,
  headers: true,
});

module.exports = limiter;
