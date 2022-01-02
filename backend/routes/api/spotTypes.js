const express = require('express');
const asyncHandler = require('express-async-handler');

const { SpotType } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const types = await SpotType.findAll();
  res.json({ types });
}));

module.exports = router;