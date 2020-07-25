const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    // 401 - not authorized 
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // any route using this middleware will be able to get user
    req.user = decoded.user;
    next();
  } catch (err) {
    // run if token not valid
    res.status(401).json({ msg: 'Token is not valid' });
  }
}