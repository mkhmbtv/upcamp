const express = require('express');
const asyncHandler = require('express-async-handler');

const { Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateBooking } = require('../utils/validators');
const { resourceNotFoundError } = require('../utils/errors');

const router = express.Router();
router.use(requireAuth);

router.get(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const bookings = await Booking.findAll({ 
      where: { userId: req.user.id },
    });
    res.json({ bookings });
  }),
);

router.post(
  '/',
  validateBooking,
  asyncHandler(async (req, res) => {
    const { 
      spotId,
      numGuests,
      startDate,
      endDate,
    } = req.body;
    
    const booking = await Booking.create({
      userId: req.user.id,
      spotId,
      numGuests,
      startDate,
      endDate,
    });

    res.json({ booking });
  }),
);

router.put(
  '/:id(\\d+)',
  validateBooking,
  asyncHandler(async (req, res, next) => {
    const bookingId = parseInt(req.params.id, 10);
    const {
      numGuests,
      startDate,
      endDate,
    } = req.body;

    const booking = await Booking.findByPk(bookingId);
    if (!booking) return next(resourceNotFoundError('Booking', bookingId));

    await booking.update({
      numGuests,
      startDate,
      endDate,
    });

    res.json({ booking });
  }),
);

router.delete(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const bookingId = parseInt(req.params.id, 10);
    const booking = await Booking.findByPk(bookingId);
    if (!booking) return next(resourceNotFoundError('Booking', bookingId));

    await booking.destroy();
    res.json({ message: "success" });
  }),
);

module.exports = router;