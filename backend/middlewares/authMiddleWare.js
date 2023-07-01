const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler')
const User = require('../models/userModel')

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  // Read the JWT from the cookie
  let token = req.cookies.jwt

  if (token) {
    try {
      // decode the token to get the userId
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.userId).select('-password')
      next()
    } catch (err) {
      console.error(err)
      res.status(401)
      throw new Error('Not authorized, token failed.')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token.')
  }
})

// Admin middleware
exports.admin = (req, res, next) => {
  if (req.user?.isAdmin) {
    next ()
  } else {
    res.status(401)
    throw new Error('Not authorized as admin')
  }
}
