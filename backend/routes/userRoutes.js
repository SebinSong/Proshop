const express = require('express')
const logger = require('morgan')
const {
  authUser, registerUser, logoutUser, getUserProfile, updateUserProfile,
  getUsers, getUserById, deleteUser, updateUser
} = require('../controllers/userController.js')

const router = express.Router()
router.use(logger('dev'))

router.route('/')
  .get(getUsers)
  .post(registerUser)

router.route('/login').post(authUser)
router.route('/logout').post(logoutUser)

router.route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile)

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)

module.exports = router
