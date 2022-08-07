const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail(() => new NotFoundError())
    .then((movies) => res.send(movies))
    .catch(next);
};

// Добавление фильма
const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country, director, duration, year, description, image,
    trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch(next);
};

// Удаление фильма
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) throw new NotFoundError();
      else if (req.user._id !== movie.owner.toString()) {
        next(new ForbiddenError());
      } else {
        movie.remove()
          .then(() => res.send(movie));
      }
    })
    .catch(next);
};

// Экспорт модулей
module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
