const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersRoute = require('./users');
const moviesRoute = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/users');
const urlRegExp = require('../utils/url-regexp');
const NotFoundError = require('../errors/not-found-err');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(urlRegExp),
    }),
  }),
  createUser,
);

router.use(auth);
router.use('/users', usersRoute);
router.use('/movies', moviesRoute);
router.post('/signout', logout);

router.use((req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});

module.exports = router;
