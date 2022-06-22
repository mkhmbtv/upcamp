const express = require('express');
const asyncHandler = require('express-async-handler');

const { Spot, SpotType, Review, Image, Amenity, User } = require('../../db/models');
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
    const spot = await Spot.findByPk(spotId, {
      include: [
        {
          model: Image,
          attributes: ['id', 'url']
        },
        {
          model: Review,
          attributes: ['id', 'title', 'body', 'recommended']
        },
        {
          model: Amenity,
          attributes: ['id', 'title', 'essential'],
          through: { attributes: [] }
        },
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }
      ],
      order: [[Review, 'createdAt'], [Image, 'createdAt']]
    })
    
    if (!spot) {
      return next(resourceNotFoundError('Spot', spotId));
    }
    
    res.json({ spot })
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