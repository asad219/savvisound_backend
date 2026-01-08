const { constants } = require("../utils/constants");
const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    logger.error("Headers already sent. Cannot send response again.", {
      error: err.message,
      stack: err.stack,
      url: req.url,
      method: req.method
    });
    return next(err);
  }

  const statusCode = res.statusCode ? res.statusCode : 500;

  // Log all errors
  logger.error('API Error', {
    statusCode,
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.status(statusCode).json({
        title: "Validation Failed",
        message: err.message,
        //stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.status(statusCode).json({
        title: "Unauthorized",
        message: err.message,
        //stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.status(statusCode).json({
        title: "Forbidden",
        message: err.message,
        //stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.status(statusCode).json({
        title: "Not found",
        message: err.message,
        //stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.status(statusCode).json({
        title: "Server Error",
        message: err.message,
        //stackTrace: err.stack,
      });
      break;
    default:
      res.status(500).json({
        title: "Server Error",
        message: err.message,
        //stackTrace: err.stack,
      });
      break;
  }
};

module.exports = errorHandler;
