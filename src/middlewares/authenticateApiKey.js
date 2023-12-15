// authenticateApiKey.js
const apiKeyHeader = 'X-API-Key';
const expectedApiKey = process.env.EXPECTED_API_KEY;

function authenticateApiKey(req, res, next) {
  const apiKey = req.header(apiKeyHeader);

  if (!apiKey || apiKey !== expectedApiKey) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // You can attach the user to the request for further use in your routes
  req.user = process.env[apiKey];
  next();
}

module.exports = authenticateApiKey;
