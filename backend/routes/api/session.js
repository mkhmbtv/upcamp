const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { User } = require('../../db/models');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a valid username or email'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password'),
  handleValidationErrors
];

router.post(
  '/',
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.login({ credential, password });
    if (!user) {
      const err = new Error('Login failed');
      err.title = 'Login failed';
      err.errors = ['Invalid credentials.'];
      err.status = 401;
      return next(err);
    }
    
    await setTokenCookie(res, user);
    res.json({ user });
  }),
);

router.delete('/', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'success' });
});

// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      res.json({ user });
    } else {
      res.json({});
    }
  },
);

module.exports = router;