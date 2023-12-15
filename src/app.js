const express = require('express');
const helmet = require('helmet');
const swaggerSetup = require('./config/swaggerSetup'); // Separate Swagger setup
const calculatorRoutes = require('./routes/calculatorRoutes');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

swaggerSetup(app); // Setup Swagger

app.get('/', (req, res) => {
  res.send('Welcome to the Calculator API. Visit <a href="/api-docs">API Documentation</a> to know more about the available operations.');
});

app.use('/api/v1/calculator', calculatorRoutes);
app.use('/users', userRoutes);

module.exports = app;
