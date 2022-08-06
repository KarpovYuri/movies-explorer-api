const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlRegExp = require('../utils/url-regexp');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// Роуты фильмов
router.get('/movies', getMovies);

router.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(urlRegExp),
      trailer: Joi.string().required().regex(urlRegExp),
      thumbnail: Joi.string().required().regex(urlRegExp),
      owner: Joi.string().length(24).hex(),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

router.delete(
  '/movies/_id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().length(24).hex(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
