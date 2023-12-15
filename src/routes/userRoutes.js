// userRoutes.js

const express = require('express');
const router = express.Router();
const authenticateApiKey = require('../middlewares/authenticateApiKey');

// Endpoint to validate the API key
router.get('/validateToken', authenticateApiKey, (req, res) => {
  // If the API key is valid, the middleware has already passed
  res.status(200).json({ message: 'API key is valid' });
});

module.exports = router;
