// arithmeticMiddleware.js

function validateArithmeticInputs(req, res, next) {
    const { a, b } = req.body;

    // Check if 'a' and 'b' are numbers
    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ error: "Invalid input: Inputs must be numbers." });
    }

    const endpoint = req.url.split('/').pop(); // Extract the last part of the URL
    if (endpoint === 'divide' && b === 0) {
      return res.status(400).json({ error: "Cannot divide by zero." });
    }
    next();
}

module.exports = validateArithmeticInputs;
