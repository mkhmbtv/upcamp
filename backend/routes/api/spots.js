const express = require('express');
const asyncHandler = require('express-async-handler');

const { Spot, Amenity, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateReview } = require('../utils/validators');
const { resourceNotFoundError } = require('../utils/errors');

const router = express.Router();

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
      return next(resourceNotFoundError('Spot', spotId));
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
  '/:id(\\d+)/reviews', 
  asyncHandler(async (req, res, next) => {
    const spotId = parseInt(req.params.id, 10);
    const spot = await Spot.findByPk(spotId);
    if (!spot) return next(resourceNotFoundError('Spot', spotId));

    const reviews = await Review.findAll({
      where: { spotId },
      include: ['user'],
    });

    res.json({ reviews });
  }),
);

router.post(
  '/:id(\\d+)/reviews',
  requireAuth,
  validateReview,
  asyncHandler(async (req, res, next) => {
    const spotId = parseInt(req.params.id, 10);
    const spot = await Spot.findByPk(spotId);
    if (!spot) return next(resourceNotFoundError('Spot', spotId));

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