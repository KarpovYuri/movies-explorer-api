const router = require('express').Router();
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validator');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

// Роуты фильмов
router.get('/', getMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/_id', validateDeleteMovie, deleteMovie);

module.exports = router;
