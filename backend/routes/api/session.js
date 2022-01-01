const express = require('express');
const asyncHandler = require('express-async-handler');

const { User } = require('../../db/models');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { validateLogin } = require('../utils/validators');

const router = express.Router();

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