const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: 'Not authenticated' });
  }

  const token = authHeader.substring(7);

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach the verified user to the request object
    next(); // Continue to the next middleware/route handler
  } catch (error) {
    console.log('Error:', error);
    res.status(401).send({ message: 'Not authenticated' });
  }
}

module.exports = authenticate;
