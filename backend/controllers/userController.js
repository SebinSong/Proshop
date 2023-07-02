const User = require('../models/userModel')
const asyncHandler = require('../middlewares/asyncHandler')
const { hashPassword } = require('../utils/encrypt-utils')
const { DAYS_MILLIS } = require('../utils/time-utils')
const jwt = require('jsonwebtoken')

const isEnvProduction = process.env.NODE_ENV === 'production'

// helper functions
const sendClientErr = (res, msg) => {
  res.status(400)
  throw new Error(msg)
}
const generateAndSendToken = (user, res) => {
  const token = jwt.sign(
    { userId: user._id || user.id }, // payload
    process.env.JWT_SECRET, // secret
    { // options (reference: https://www.npmjs.com/package/jsonwebtoken)
      expiresIn: '30d'
    }
  )

  // set JWT as an http-only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: isEnvProduction,
    sameSite: 'strict',
    maxAge: DAYS_MILLIS * 30 // 30d
  })
  res.json({
    _id: user._id,
    name: user.name,
    isAdmin: user.isAdmin,
    email: user.email
  })
}

// @desc Get all users 
// @route GET /users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res, next) => {
  res.send('Get all user!')
})

// @desc Auth user & get token
// @route POST /users/auth
// @access Public
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body || {}

  const user = await User.findOne({ email })
  if (user && 
    (await user.matchPassword(password))
  ) {
    generateAndSendToken(user, res)
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc Register user & auth the user
// @route POST /users
// @access Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, password, email } = req.body
  
  // Check if the request contains all the required fields in the payload.
  if (!name || !password || !email) {
    sendClientErr(res, 'request has one or more missing fields.')
  }

  // check if the requested email already exists in the DB.
  const userExists = await User.findOne({ email })
  if (userExists) {
    sendClientErr(res, 'User already exists.')
  }

  // create a user & generate Token
  const user = await User.create({
    email, password, name
  })
  generateAndSendToken(user, res)
})

// @desc Logout user & clear the cookie
// @route POST /users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res, next) => {
  if (!req.cookies.jwt) {
    sendClientErr(res, 'Invalid logout request - no token')
  }

  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200)
  res.json({ message: 'Logged out successfully' })
})

// @desc Get user profile 
// @route GET /users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res, next) => {
  res.send('Get user profile!')
})

// @desc Update user profile 
// @route PUT /users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res, next) => {
  res.send('Update user profile!')
})

// @desc Get user by id
// @route GET /users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res, next) => {
  res.send('Get a user by id!')
})

// @desc Delete user 
// @route DELETE /users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res, next) => {
  res.send('Delete user!')
})

// @desc Update user by id
// @route PUT /users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res, next) => {
  res.send('Update user by id!')
})

module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser
}
