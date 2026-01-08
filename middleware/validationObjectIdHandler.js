const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id || req.params.userId)) {
    res.status(400);
    throw new Error('Invalid user ID format');
  }
  next();
};

module.exports = {
  validateObjectId
};