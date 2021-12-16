const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { User } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('First name must not be more than 50 characters long'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Last name must not be more than 50 characters long'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4, max: 30 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be email'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more'),
  handleValidationErrors
]

router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { 
      firstName,
      lastName,
      username,
      email,
      password,
    } = req.body;

    const user = await User.signup({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    await setTokenCookie(res, user);
    res.json({ user });
  }),
);

module.exports = router;