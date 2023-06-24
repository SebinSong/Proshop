exports.notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

exports.errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let errMessage = err.message

  // Check for Mongoose bad ObjectId error
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    errMessage = 'Resource Not Found'
    statusCode = 404
  }

  res.status(statusCode).json({
    message: errMessage,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack
  })
}
