const { statusCodes } = require('../utils/statusCodes');

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(statusCodes.NOT_FOUND.code);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCodes || statusCodes.BAD_REQUEST.code;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
