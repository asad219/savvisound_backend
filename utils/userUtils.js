const sanitizeUserResponse = (user) => {
  const userObj = user.toObject ? user.toObject() : { ...user };
  delete userObj.passwordHash;
  return userObj;
};

module.exports = {
  sanitizeUserResponse
};