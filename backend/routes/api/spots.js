const express = require('express');
const asyncHandler = require('express-async-handler');

const { Spot, Amenity, Review, Image } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateReview } = require('../utils/validators');
const { resourceNotFoundError } = require('../utils/errors');

const router = express.Router();

router.get(
  '/', 
  asyncHandler(async (req, res) => {
    const spots = await Spot.findAll();
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
    const reviews = await Review.findAll({ where: { spotId } });
    const amenities = await spot.getAmenities();
    spot.dataValues.Images = images.map((image) => image.id);
    spot.dataValues.Reviews = reviews.map((review) => review.id);
    spot.dataValues.Amenities = amenities.map((amenity) => amenity.id);
    res.json({ spot, images, reviews, amenities });
  }),
);

router.get(
  '/:id(\\d+)/images',
  asyncHandler (async (req, res) => {
    const spotId = parseInt(req.params.id, 10);
    const images = await Image.findAll({ where: { spotId }});
    res.json({ images });
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