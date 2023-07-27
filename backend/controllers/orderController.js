const Order = require('../models/orderModel')
const asyncHandler = require('../middlewares/asyncHandler')

// @desc Get all orders
// @route GET /orders
// @access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  res.send('get all orders!')
})

// @desc Create new order
// @route POST /orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  res.send('Add order items!')
})

// @desc Get logged in user orders
// @route GET /orders/mine
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  res.send('Get my orders!')
})

// @desc Get order by id
// @route GET /orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  res.send('Get order by id!')
})

// @desc Update order to paid
// @route PUT /orders/:id/pay
// @access Private
const UpdateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('Update order to paid!')
})

// @desc Update order to delivered
// @route PUT /orders/:id/deliver
// @access Private/Admin
const UpdateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('Update order to delivered!')
})

module.exports = {
  getAllOrders,
  addOrderItems,
  getMyOrders,
  getOrderById,
  UpdateOrderToPaid,
  UpdateOrderToDelivered
}
