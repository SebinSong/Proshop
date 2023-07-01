const express = require('express')
const logger = require('morgan')
const {
  authUser, registerUser, logoutUser, getUserProfile, updateUserProfile,
  getUsers, getUserById, deleteUser, updateUser
} = require('../controllers/userController.js')
const { admin, protect } = require('../middlewares/authMiddleWare.js')

const router = express.Router()
router.use(logger('dev'))

router.route('/')
  .get(protect, admin, getUsers)
  .post(registerUser)

router.route('/auth').post(authUser)
router.route('/logout').post(logoutUser)

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router.route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser)

module.exports = router
