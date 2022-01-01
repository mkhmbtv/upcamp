const { check } = require('express-validator');
const { User, Spot } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid username or email'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password'),
  handleValidationErrors
];

const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a First Name.')
    .isLength({ max: 50 })
    .withMessage('First name must not be more than 50 characters long.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a Last Name.')
    .isLength({ max: 50 })
    .withMessage('Last name must not be more than 50 characters long.'),
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email.')
    .custom((value) => {
      return User.scope('currentUser').findOne({ where: { email: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('Email address already in use.');
          }
        });
    }),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4, max: 30 })
    .withMessage('Please provide a username with at least 4 characters.')
    .custom((value) => {
      return User.findOne({ where: { username: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('Username already in use.')
          }
        })
    }),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be email.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.')
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more'),
  handleValidationErrors
];

const validateBooking = [
  check('startDate')
    .isISO8601()
    .withMessage('Please provide a valid check-in date.'),
  check('endDate')
    .isISO8601()
    .withMessage('Please provide a valid check-out date.')
    .custom((value, { req }) => {
      const startDate = new Date(req.body.startDate);
      const endDate = new Date(value);
      if (endDate <= startDate) throw new Error('Check-out date must be after check-in date');
      return true;
    }),
  check('numGuests')
    .exists({ checkFalsy: true })
    .isInt()
    .custom((value, { req }) => {
      return Spot.findOne({ where: { id: req.body.spotId } })
        .then((spot) => {
          if (value > spot.maxCapacity) {
            return Promise.reject('Provided number of guests exceeds the maximum capacity');
          }
        })
    }),
  handleValidationErrors,
];

const validateReview = [
  check('body')
    .exists({ checkFalsy: true })
    .withMessage('Please enter your review.'),
  check('recommended')
    .isBoolean()
    .withMessage('Recommended is not a boolean value'),
  handleValidationErrors,
];

module.exports = {
  validateLogin,
  validateSignup,
  validateBooking,
  validateReview,
};