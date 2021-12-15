const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csrf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');

const { environment } = require('./config');
const isProduction = environment === 'production';
const routes = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
  app.use(cors());
}
app.use(helmet({
  contentSecurityPolicy: false,
}));

app.use(csrf({
  cookie: {
    secure: isProduction,
    sameSite: isProduction && 'Lax',
    httpOnly: true,
  },
}));

app.use(routes);

// Catch unhandled requests and forward to error handler
app.use((_req, _res, next) => {
  const err = new Error('The requested resource could not be found.');
  err.title = 'Resource Not Found';
  err.errors = ['The requested resource could not be found.'];
  err.status = 404;
  next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((error) => error.message);
    err.title = 'Validation error';
  }
  next(err);
});

// Error formatter
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

module.exports = app;