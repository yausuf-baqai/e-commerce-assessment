const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Authentication Middleware
 * Validates the JWT token and optionally checks for roles.
 * @param {string} requiredRole - The required role to access the route (optional).
 */
const authMiddleware = (requiredRole) => {
  return (req, res, next) => {
    // Extract token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    const token = authHeader.split(' ')[1];

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user information to the request object
      req.user = decoded;

      // If a required role is specified, check the user's role
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden: Access denied' });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  };
};

module.exports = authMiddleware;
