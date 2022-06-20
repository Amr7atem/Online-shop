const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: is ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFields = (err) => {
  const message = `Duplicate filed ${err.keyValue.name}, Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  // const message = err.message;
  // return new AppError(message, 400);
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired. please log in again.', 401);

const senErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR 💥', err);

    // 2) Send generic message

    res.status(500).json({
      status: 'err',
      message: 'Something went very wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    senErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // let error = { ...err };
    // console.log('************************************', error);
    //
    // if (error.kind === 'ObjectId') error = handleCastErrorDB(error);
    // if (error.code === 11000) error = handleDuplicateFields(error);
    // if (error.errors.name === 'ValidationError')
    //   error = handleValidationErrorDB(error);
    // sendErrorProd(error, res);

    if (err.name === 'CastError') err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFields(err);
    if (err.name === 'ValidationError') err = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') err = handleJWTError();
    if (err.name === 'TokenExpiredError') err = handleJWTExpiredError();
    sendErrorProd(err, res);
  }
};
