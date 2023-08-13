const User = require('../models/userModel')
const asyncHandler = require('../middlewares/asyncHandler')
const { hashPassword } = require('../utils/encrypt-utils')
const { DAYS_MILLIS } = require('../utils/time-utils')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const isEnvProduction = process.env.NODE_ENV === 'production'

// helper functions
const sendClientErr = (res, msg) => {
  res.status(400)
  throw new Error(msg)
}
const passwordsMatch = async (pw1, pw2) => {
  return await bcrypt.compare(pw1, pw2)
}

const findUserById = async (userId, res) => {
  const user = await User.findById(userId)

  if (!user) {
    res.status(404)
    throw new Error(`User with the id [${userId}] cannot be found.`)
  }

  return user
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
  res.status(200).json({
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
  const users = await User.find({})
  res.status(200).json(users)
})

// @desc Get user by id
// @route GET /users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res, next) => {
  const userId = req.params.id
  const user = await findUserById(userId, res)
  await user.select('-password')

  res.status(200).json(user)
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
  res.status(200).json({ message: 'Logged out successfully' })
})

// @desc Get user profile 
// @route GET /users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res, next) => {
  const { _id, name, email, isAdmin } = req.user
  res.status(200).json({
    _id, name, email, isAdmin
  })
})

// @desc Update user profile 
// @route PUT /users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id)
  const { email, name, password } = req.body

  user.email = email || user.email
  user.name = name || user.name

  if (password) {
    const matches = await user.matchPassword(password)

    if (matches) {
      res.status(400)
      throw new Error('password already exists.')
    }

    user.password = password
  }

  const updatedUser = await user.save()

  res.status(200).json({
    _id: req.user._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin
  })
})

// @desc Delete user 
// @route DELETE /users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id
  const user = await findUserById(userId)

  if (user.isAdmin) {
    res.status(400)
    throw new Error('Cannot delete an admin user.')
  } else {
    await User.deleteOne({ _id: user._id })
    res.status(204).json({
      message: `Successfully deleted the user [${userId}]`
    })
  }
})

// @desc Update user by id
// @route PUT /users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id
  const user = await findUserById(userId)

  for ([key, value] of Object.entries(req.body)) {
    if (key === 'isAdmin') {
      user.isAdmin = Boolean(value)
    } else {
      user[key] = value
    }
  }

  const updatedUser = await user.save()
  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin
  })
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
