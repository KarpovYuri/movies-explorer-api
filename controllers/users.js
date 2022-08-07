const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const { successCode, loginMessage, logoutMessage } = require('../utils/constants');

const { DEV_SECRET } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

// Получить данные о пользователе
const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError())
    .then((user) => res.send(user))
    .catch(next);
};

// Создание пользоателя
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ name, email, password: hash })
        .then((user) => {
          const returnUser = user.toObject();
          delete returnUser.password;
          res.status(successCode).send(returnUser);
        })
        .catch(next);
    });
};

// Обновление пользователя
const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError())
    .then((user) => res.send(user))
    .catch(next);
};

// Авторизация пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV !== 'production' ? DEV_SECRET : JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ _id: user._id, message: loginMessage });
    })
    .catch(next);
};

// Выход пользователя
const logout = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email })
    .then(() => {
      res.clearCookie('jwt', { httpOnly: true, sameSite: true }).send({ message: logoutMessage });
    })
    .catch(next);
};

// Экспорт модулей
module.exports = {
  getUser,
  createUser,
  updateUser,
  login,
  logout,
};
