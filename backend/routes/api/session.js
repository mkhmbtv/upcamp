const express = require('express');
const asyncHandler = require('express-async-handler');

const { User } = require('../../db/models');
const { setTokenCookie } = require('../../utils/auth');

const router = express.Router();

router.post(
  '/',
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

module.exports = router;