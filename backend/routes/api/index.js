const express = require('express');
const sessionRouter = require('./session');
const usersRouter = require('./users');
const spotsRouter = require('./spots');

const router = express.Router();

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);

module.exports = router;