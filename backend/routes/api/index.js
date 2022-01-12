const express = require('express');
const sessionRouter = require('./session');
const usersRouter = require('./users');
const spotsRouter = require('./spots');
const bookingsRouter = require('./bookings');
const reviewsRouter = require('./reviews');
const spotTypesRouter = require('./spotTypes');
const mapsRouter = require('./maps');

const router = express.Router();

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/spot-types', spotTypesRouter);
router.use('/bookings', bookingsRouter);
router.use('/reviews', reviewsRouter);
router.use('/maps', mapsRouter);

module.exports = router;