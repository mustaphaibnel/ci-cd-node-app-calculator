const express = require('express');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

// Swagger definition
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Calculator API',
            version: '1.0.0',
            description: 'A simple calculator API to perform basic arithmetic operations',
        },
        basePath: '/',
    },
    apis: ['./app.js'], // files containing Swagger annotations
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome message
 *     responses:
 *       200:
 *         description: Returns a welcome message.
 */
app.get('/', (req, res) => {
  res.send('Hello from server');
});

/**
 * @swagger
 * /add:
 *   post:
 *     summary: Adds two numbers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               a:
 *                 type: number
 *                 description: First number
 *               b:
 *                 type: number
 *                 description: Second number
 *     responses:
 *       200:
 *         description: Result of addition
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Sum of the two numbers
 */
app.post('/add', (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a + b });
});

/**
 * @swagger
 * /subtract:
 *   post:
 *     summary: Subtracts two numbers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               a:
 *                 type: number
 *                 description: First number
 *               b:
 *                 type: number
 *                 description: Second number
 *     responses:
 *       200:
 *         description: Result of subtraction
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Result of subtracting b from a
 */
app.post('/subtract', (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a - b });
});

/**
 * @swagger
 * /multiply:
 *   post:
 *     summary: Multiplies two numbers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               a:
 *                 type: number
 *                 description: First number
 *               b:
 *                 type: number
 *                 description: Second number
 *     responses:
 *       200:
 *         description: Result of multiplication
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Product of the two numbers
 */
app.post('/multiply', (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a * b });
});

/**
 * @swagger
 * /divide:
 *   post:
 *     summary: Divides two numbers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               a:
 *                 type: number
 *                 description: First number
 *               b:
 *                 type: number
 *                 description: Second number
 *     responses:
 *       200:
 *         description: Result of division
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: number
 *                   description: Result of dividing a by b
 *       400:
 *         description: Error response for division by zero
 */
app.post('/divide', (req, res) => {
  const { a, b } = req.body;
  if (b === 0) {
    return res.status(400).json({ error: "Cannot divide by zero" });
  }
  res.json({ result: a / b });
});

module.exports = app;
