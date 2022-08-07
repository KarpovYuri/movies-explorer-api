const router = require('express').Router();
const usersRoute = require('./users');
const moviesRoute = require('./movies');
const auth = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/users');
const { validateLogin, validateCreateUser } = require('../middlewares/validator');
const NotFoundError = require('../errors/not-found-err');

// Роуты авторизации
router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);
router.use('/users', usersRoute);
router.use('/movies', moviesRoute);
router.post('/signout', logout);

router.use((req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});

module.exports = router;
