const express = require('express');
const asyncHandler = require('express-async-handler');

const { Spot, SpotType, Review, Image, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateReview } = require('../utils/validators');
const { resourceNotFoundError } = require('../utils/errors');

const router = express.Router();

router.get(
  '/', 
  asyncHandler(async (req, res) => {
    const spots = await Spot.findAll({
      include: {
        model: SpotType,
        attributes: ['type'],
      }
    });
    res.json({ spots });
  }),
);

router.get('/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const spotId = parseInt(req.params.id, 10);
    const spot = await Spot.findWithStuff(spotId);
    
    if (!spot) {
      return next(resourceNotFoundError('Spot', spotId));
    }
    const images = await Image.findAll({ where: { spotId } });
    const reviews = await Review.findAll({ where: { spotId }, include: User });
    const amenities = await spot.getAmenities();

    res.json({ spot, images, reviews, amenities });
  }),
);

router.get(
  '/:spotType',
  asyncHandler (async (req, res) => {
    const spots = await Spot.findAll({
      include: {
        model: SpotType,
        attributes: ['type'],
        where: {
          type: req.params.spotType,
        },
      }
    });
    res.json({ spots });
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
    const newReview = await Review.findByPk(review.id, { include: User });
    res.json({ newReview });
  }),
);


router.get(
  '/:id(\\d+)/amenities',
  asyncHandler(async (req, res, next) => {
    const spotId = parseInt(req.params.id, 10);
    const spot = await Spot.findByPk(spotId);
    if (!spot) return next(resourceNotFoundError('Spot', spotId));

    const amenities = await spot.getAmenities();
    res.json({ amenities });
  }),
);

module.exports = router;