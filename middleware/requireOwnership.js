const requireOwnership = (paramName = 'userId') => {
  return (req, res, next) => {
    const resourceUserId = req.params[paramName];
    console.log('Resource: ', req.params[paramName]);
    console.log('Resource User ID:', resourceUserId);
    const authenticatedUserId = req.user.userId.toString();

    // Admin bypass
    if (req.user.role === 'admin') {
      return next();
    }

    // Ownership check
    if (resourceUserId !== authenticatedUserId) {
      res.status(403);
      throw new Error('Access denied: You do not have permission to access this resource');
    }

    next();
  };
};

module.exports = requireOwnership;
