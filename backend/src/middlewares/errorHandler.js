const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errMsg = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message: errMsg,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack 
  });
};

export default errorHandler;