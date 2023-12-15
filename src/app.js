// app.js
const express = require('express');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./src/swagger.yaml');
const calculatorRoutes = require('./routes/calculatorRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
const dotenv = require('dotenv'); // Import dotenv library

// Load environment variables from .env file
dotenv.config();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to the Calculator API. Visit <a href="/api-docs">API Documentation</a> to know more about the available operations.');
});

// Parent API route
app.use('/api/v1/calculator', calculatorRoutes);
app.use('/users', userRoutes);
module.exports = app;
