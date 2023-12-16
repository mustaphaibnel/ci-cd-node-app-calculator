const request = require('supertest');
const express = require('express');
const swaggerSetup = require('../src/config/swaggerSetup');

describe('Swagger Documentation Setup', () => {
  let app;

  beforeEach(() => {
    app = express();
    swaggerSetup(app); // Apply the Swagger setup to the Express app instance
  });

  it('should serve the Swagger UI at /api-docs/', async () => {
    // Adjusted to handle potential redirection to /api-docs/
    const response = await request(app).get('/api-docs/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Swagger UI');
  });

  it('should have the correct Swagger JSON document', async () => {
    // Adjusted to handle potential redirection and correct endpoint for Swagger JSON
    const response = await request(app).get('/api-docs/swagger.json').redirects(1);
    expect(response.statusCode).toBe(200); // Ensure a 200 response

    try {
      const swaggerDoc = JSON.parse(response.text);
      // You can add more checks here if necessary
    } catch (error) {
      throw new Error(`Failed to parse Swagger JSON: ${error}`);
    }
  });
});
