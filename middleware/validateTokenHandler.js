const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const config = require('../config');

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authheader = req.headers.authorization || req.headers.Authorization;

  if (!authheader || !authheader.startsWith('Bearer')) {
    res.status(401);
    throw new Error('Authorization token must be Bearer token');
  }

  token = authheader.split(' ')[1];

  if (!token) {
    res.status(401);
    throw new Error('Token not found');
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401);
    throw new Error('User is not authorized');
  }
});

module.exports = validateToken;
