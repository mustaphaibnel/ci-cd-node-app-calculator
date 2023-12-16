const request = require('supertest');
const express = require('express');
const swaggerSetup = require('../src/config/swaggerSetup');

describe('Swagger Documentation Setup', () => {
  let app;

  beforeEach(() => {
    app = express();
    swaggerSetup(app);
  });

  it('should serve the Swagger UI at /api-docs/', async () => {
    const response = await request(app).get('/api-docs/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Swagger UI');
  });

  /*
  it('should have the correct Swagger JSON document', async () => {
    const response = await request(app).get('/api-docs/swagger.json').redirects(1);
    expect(response.statusCode).toBe(200);

    try {
      const swaggerDoc = JSON.parse(response.text);
      // Additional assertions can be added here if needed
    } catch (error) {
      throw new Error(`Failed to parse Swagger JSON: ${error.message}`);
    }
  });
  */

});
