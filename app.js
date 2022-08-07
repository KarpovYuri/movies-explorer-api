require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { allowedUrls } = require('./utils/constants');
const { MONGO_SERVER_URL } = require('./utils/config');
const limiter = require('./middlewares/limiter');

mongoose.connect(MONGO_SERVER_URL);

const { PORT = 3000 } = process.env;

const app = express();

app.use(requestLogger);

app.use(limiter);
app.use(helmet());

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: allowedUrls, credentials: true }));

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => { });
