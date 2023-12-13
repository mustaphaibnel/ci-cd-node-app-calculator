const express = require('express');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./src/swagger.yaml');
const validateArithmeticInputs = require('./middlewares/arithmeticMiddleware');
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Welcome to the Calculator API. Visit <a href="/api-docs">API Documentation</a> to know more about the available operations.');
});


app.post('/add', validateArithmeticInputs, (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a + b });
});

app.post('/subtract', validateArithmeticInputs, (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a - b });
});

app.post('/multiply', validateArithmeticInputs, (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a * b });
});


app.post('/divide', validateArithmeticInputs, (req, res) => {
  const { a, b } = req.body;
  if (b === 0) {
    return res.status(400).json({ error: "Cannot divide by zero" });
  }
  res.json({ result: a / b });
});

module.exports = app;
