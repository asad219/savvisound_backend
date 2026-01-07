const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authheader = req.headers.authorization || req.headers.Authorization;
  
  if (!authheader) {
    res.status(401);
    throw new Error("Please provide token");
  }
  
  if (authheader && authheader.startsWith("Bearer")) {
    token = authheader.split(" ")[1];
    
    if (!token) {
      res.status(401);
      throw new Error("Token not found");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded.user;
      next();
    });
  } else {
    res.status(401);
    throw new Error("Authorization token must be Bearer token");
  }
});
module.exports = validateToken;
