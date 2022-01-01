const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Spot, Amenity, SpotType, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const spotNotFoundError = (id) => {
  const err = new Error(`Spot with an id of ${id} could not be found.`);
  err.title = 'Spot not found';
  err.errors = [`Spot with an id of ${id} could not be found.`];
  err.status = 404;
  return err;
};

router.get(
  '/', 
  asyncHandler(async (req, res) => {
    const spots = await Spot.scope('withImages').findAll();
    res.json({ spots });
  }),
);

router.get('/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const spotId = parseInt(req.params.id, 10);
    const spot = await Spot.scope('fullSpot').findByPk(spotId);
    
    if (!spot) {
      return next(spotNotFoundError(spotId));
    }

    res.json({ spot });
  }),
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const spotObj = { ...req.body };
    delete spotObj.amenities;
    const spot = await Spot.create(spotObj, { include: ['images'] });
    req.body.amenities.forEach(async (amenityId) => {
      const amenity = await Amenity.findByPk(amenityId);
      await spot.addAmenity(amenity);
    });
    res.json({ spot });
  }),
);

router.get(
  '/types', 
  asyncHandler(async (req, res)=> {
    const types = await SpotType.findAll({ order: ['id'] });
    res.json({ types });
  }),
);

router.get(
  '/:id(\\d+)/reviews', 
  asyncHandler(async (req, res, next) => {
    const spotId = parseInt(req.params.id, 10);
    const spot = await Spot.findByPk(spotId);
    if (!spot) return next(spotNotFoundError(spotId));

    const reviews = await Review.findAll({
      where: { spotId },
      include: ['user'],
    });

    res.json({ reviews });
  }),
);

const validateReview = [
  check('body')
    .exists({ checkFalsy: true })
    .withMessage('Please enter your review.'),
  check('recommended')
    .isBoolean()
    .withMessage('Recommended is not a boolean value'),
  handleValidationErrors,
];

router.post(
  '/:id(\\d+)/reviews',
  requireAuth,
  validateReview,
  asyncHandler(async (req, res, next) => {
    const spotId = parseInt(req.params.id, 10);
    const spot = await Spot.findByPk(spotId);
    if (!spot) return next(spotNotFoundError(spotId));

    const { title, body, recommended } = req.body;
    const review = await Review.create({
      userId: req.user.id,
      spotId,
      title,
      body,
      recommended,
    });

    res.json({ review });
  }),
);

module.exports = router;