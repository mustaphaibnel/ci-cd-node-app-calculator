const express = require('express');
const app = express();

// Parse JSON and url-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/add', (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a + b });
});

app.post('/subtract', (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a - b });
});

app.post('/multiply', (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a * b });
});

app.post('/divide', (req, res) => {
  const { a, b } = req.body;
  if (b === 0) {
    return res.status(400).json({ error: "Cannot divide by zero" });
  }
  res.json({ result: a / b });
});

module.exports = app;
