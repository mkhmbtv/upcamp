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
          model: Amenity,
          attributes: ['id', 'title', 'essential'],
          through: { attributes: [] }
        },
        {
          model: SpotType,
          attributes: ['id', 'type']
        },
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }
      ],
      order: [[Image, 'createdAt']]
    })
    
    if (!spot) {
      return next(resourceNotFoundError('Spot', spotId));
    }

    const reviews = await spot.getReviews({
      attributes: ['id', 'title', 'body', 'recommended', 'createdAt'],
      include: {
        model: User,
        attributes: ['id', 'firstName', 'lastName'],
      },
      order: ['createdAt']
    });
    spot.dataValues.Reviews = reviews.map(review => review.id);

    res.json({ spot, reviews });
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

module.exports = router;