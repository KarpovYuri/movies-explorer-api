require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');
const { login, createUser, logout } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const urlRegExp = require('./utils/url-regexp');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/moviesdb');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,
}));

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);
app.post(
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

app.use(auth);

app.use(requestLogger);

app.use('/', userRoutes);
app.use('/', movieRoutes);

app.use('/signout', logout);

app.use('*', (req, res, next) => next(new NotFoundError('Страницы не существует')));

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка по умолчанию' : message });
  next();
});

app.listen(PORT, () => { });
