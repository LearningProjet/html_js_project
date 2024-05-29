const AppError = require('../utils/errorClass');

const globalErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (error.name === 'CastError') {
    error = new AppError('Resource not found', 404);
  }

  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map((el) => el.message);
    error = new AppError(`Invalid input data. ${messages.join('. ')}`, 400);
  }

  if (error.code === 11000) {
    error = new AppError('Duplicate field value entered', 400);
  }

  res.status(error.statusCode || 500).json({
    status: error.status,
    message: error.message,
  });
};

module.exports = globalErrorHandler;
