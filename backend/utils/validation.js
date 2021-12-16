const { validationResult } = require('express-validator');

const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => error.msg);
    const err = new Error('Bad Request.');
    err.title = 'Bad Request.';
    err.errors = errors;
    err.status = 400;
    return next(err);
  }

  return next();
};

module.exports = { handleValidationErrors };