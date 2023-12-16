const request = require('supertest');
const express = require('express');
const swaggerSetup = require('../src/config/swaggerSetup');

describe('Swagger Documentation Setup', () => {
  let app;
  let server;
  let agent;

  beforeAll((done) => {
    app = express();
    swaggerSetup(app);
    server = app.listen(0, () => {
      agent = request.agent(server); // Create an agent to handle requests
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should serve the Swagger UI at /api-docs/', async () => {
    const response = await agent.get('/api-docs/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Swagger UI');
  });

  it('should have the correct host in the Swagger document', async () => {
    const response = await agent.get('/api-docs/swagger.json').redirects(1);
    
    let swaggerDoc;
    try {
      swaggerDoc = JSON.parse(response.text);
    } catch (error) {
      throw new Error(`Failed to parse Swagger JSON: ${error}`);
    }

    // Assuming your Swagger setup function dynamically sets the host based on the request
    const expectedHost = `localhost:${server.address().port}`;
    expect(swaggerDoc.host).toBe(expectedHost);
  });
});
