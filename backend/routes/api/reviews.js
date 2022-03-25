const express = require('express');
const asyncHandler = require('express-async-handler');

const { Review, User } = require('../../db/models');
const { validateReview } = require('../utils/validators');
const { resourceNotFoundError } = require('../utils/errors');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();
router.use(requireAuth);

router.put(
  '/:id(\\d+)',
  validateReview,
  asyncHandler(async (req, res, next) => {
    const reviewId = parseInt(req.params.id, 10);
    const review = await Review.findByPk(reviewId, { include: User });
    if (!review) return next(resourceNotFoundError('Review', reviewId));

    const { title, body, recommended } = req.body;
    await review.update({
      title,
      body,
      recommended,
    });

    res.json({ review });
  }),
);

router.delete(
  '/:id(\\d+)',
  asyncHandler (async (req, res, next) => {
    const reviewId = parseInt(req.params.id, 10);
    const review = await Review.findByPk(reviewId);
    if (!review) return next(resourceNotFoundError('Review', reviewId));

    await review.destroy();
    res.json({ message: 'success' });
  }),
);

module.exports = router;