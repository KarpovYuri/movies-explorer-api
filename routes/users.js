const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { validateUpdateUser } = require('../middlewares/validator');

// Роуты пользователя
router.get('/me', getUser);
router.patch('/me', validateUpdateUser, updateUser);

module.exports = router;
