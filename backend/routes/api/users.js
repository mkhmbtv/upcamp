const express = require('express');
const asyncHandler = require('express-async-handler');

const { User } = require('../../db/models');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { validateSignup } = require('../utils/validators');

const router = express.Router();

router.get(
  '/', 
  asyncHandler(async (req, res) => {
    const users = await User.scope('currentUser').findAll();
    res.json({ users });
  }),
);

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