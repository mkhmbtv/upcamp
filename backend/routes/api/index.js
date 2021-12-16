const express = require('express');
const sessionRouter = require('./session');
const usersRouter = require('./users');

const router = express.Router();

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;