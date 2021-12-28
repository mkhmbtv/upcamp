const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Booking, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();
router.use(requireAuth);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const bookings = await Booking.findAll({ where: { userId: req.user.id } });
    res.json({ bookings });
  }),
);

const validateBooking = [
  check('startDate')
    .isDate()
    .withMessage('Please provide a valid check-in date.'),
  check('endDate')
    .isDate()
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

const bookingNotFoundError = (id) => {
  const err = new Error(`Booking with the id of ${id} could not be found.`);
  err.title = 'Booking not found.';
  err.errors = [`Booking with the id of ${id} could not be found.`];
  err.status = 404;
  return err;
};

router.put(
  '/:id(\\d+)',
  validateBooking,
  asyncHandler(async (req, res, next) => {
    const bookingId = parseInt(req.params.id, 10);
    const {
      spotId,
      numGuests,
      startDate,
      endDate,
    } = req.body;

    const booking = await Booking.findByPk(bookingId);
    if (!booking) return next(bookingNotFoundError(bookingId));

    await booking.update({
      userId: req.user.id,
      spotId,
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
    if (!booking) return next(bookingNotFoundError(bookingId));

    await booking.destroy();
    res.json({ message: "success" });
  }),
);

module.exports = router;