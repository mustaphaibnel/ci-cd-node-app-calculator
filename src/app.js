// app.js

const express = require('express');
const helmet = require('helmet');
const swaggerSetup = require('./config/swaggerSetup');
const calculatorRoutes = require('./routes/calculatorRoutes');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Elastic APM if ELASTIC_APM_ACTIVE is 'true'
if (process.env.ELASTIC_APM_ACTIVE === 'true') {
    const apm = require('elastic-apm-node').start({
        // Override service name from package.json or use an environment variable
        serviceName: process.env.APM_SERVICE_NAME || 'default-service-name',

        // Use an environment variable for the secret token
        secretToken: process.env.APM_SECRET_TOKEN || '',

        // Use an environment variable for the APM Server URL
        serverUrl: process.env.APM_SERVER_URL || 'http://localhost:8200',

        // Set the service environment
        environment: process.env.APM_ENVIRONMENT || 'production',
    });
}

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

swaggerSetup(app);

app.get('/', (req, res) => {
    res.send('Welcome to the Calculator API. Visit <a href="/api-docs">API Documentation</a> to know more about the available operations.');
});

app.use('/api/v1/calculator', calculatorRoutes);
app.use('/users', userRoutes);

module.exports = app;
