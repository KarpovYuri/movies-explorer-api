const successCode = 201;
const badRequestErrorCode = 400;
const authErrorCode = 401;
const forbiddenErrorCode = 403;
const notFoundErrorCode = 404;
const conflictErrorCode = 409;
const serverErrorCode = 500;

const badRequestErrorMessage = 'Переданы некорректные данные';
const authErrorMessage = 'Необходима авторизация';
const forbiddenErrorMessage = 'У вас нет прав на удаление данного фильма';
const notFoundErrorMessage = 'Данные не найдены';
const conflictErrorMessage = 'Пользователем с такими e-mail уже существует';
const serverErrorMessage = 'Произошла внутренняя ошибка сервера';
const userInfoErrorMessage = 'Переданы некорректные почта или пароль';
const pageNotFoundMessage = 'Страница не существует';
const loginMessage = 'Авторизация прошла успешно';
const logoutMessage = 'Выход выполнен';

const allowedUrls = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://movies.project.nomoredomains.sbs',
];

module.exports = {
  successCode,
  badRequestErrorCode,
  authErrorCode,
  forbiddenErrorCode,
  notFoundErrorCode,
  conflictErrorCode,
  serverErrorCode,
  badRequestErrorMessage,
  authErrorMessage,
  forbiddenErrorMessage,
  notFoundErrorMessage,
  conflictErrorMessage,
  serverErrorMessage,
  userInfoErrorMessage,
  pageNotFoundMessage,
  loginMessage,
  logoutMessage,
  allowedUrls,
};
