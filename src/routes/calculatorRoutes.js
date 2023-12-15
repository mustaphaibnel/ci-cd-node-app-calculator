// calculatorRoutes.js
const express = require('express');
const router = express.Router();
const validateArithmeticInputs = require('../middlewares/arithmeticMiddleware');
const authenticateApiKey = require('../middlewares/authenticateApiKey');

// Middleware for API key authentication
router.use(authenticateApiKey);

// Routes with API key authentication
router.post('/add', validateArithmeticInputs, (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a + b });
});

router.post('/subtract', validateArithmeticInputs, (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a - b });
});

router.post('/multiply', validateArithmeticInputs, (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a * b });
});

router.post('/divide', validateArithmeticInputs, (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a / b });
});

module.exports = router;
