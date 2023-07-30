const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const asyncHandler = require('../middlewares/asyncHandler')

// @desc Get all orders
// @route GET /orders
// @access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const allOrders = await Order.find({})
  res.status(200)json(allOrders)
})

// @desc Create new order
// @route POST /orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body
  const products = {} // id map of products.

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items.')
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems: orderItems.map(entry => {
        const { name, image, qty, price, _id: productId } = entry
        return {
          name, image, qty, price,
          product: productId
        }
      }),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })

    const createdOrder = await order.save()
    res.status(201).json({ ...createdOrder })
  }

})

// @desc Get logged in user orders
// @route GET /orders/mine
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id
  const myOrders = await Order.find({ user: userId })

  res.status(200).json(myOrders)
})

// @desc Get order by id
// @route GET /orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')

  if (order) {
    res.status(200).json(order)
  } else {
    res.status(404)
    throw new Error(`Order for the id - ${req.params.id} not found`)
  }
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
