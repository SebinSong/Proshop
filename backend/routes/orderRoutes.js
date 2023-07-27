const express = require('express')
const logger = require('morgan')
const {
  getAllOrders,
  addOrderItems,
  getMyOrders,
  getOrderById,
  UpdateOrderToPaid,
  UpdateOrderToDelivered
} = require('../controllers/orderController')
const { admin, protect } = require('../middlewares/authMiddleWare.js')

const router = express.Router()
router.use(logger('dev'))

router.route('/')
  .get(protect, admin, getAllOrders)
  .post(protect, addOrderItems)

router.route('/mine').get(protect, getMyOrders)
router.route('/:id').get(protect, admin, getOrderById)
router.route('/:id/pay').put(protect, UpdateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, UpdateOrderToDelivered)

module.exports = router
