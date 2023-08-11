const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const asyncHandler = require('../middlewares/asyncHandler')

// utils
const findOrderItemById = async (id, res) => {
  const order = await Order.findById(id)

  if (!order) {
    res.status(404)
    throw new Error(`Order item for the ID - ${id} is not found.`)
  }

  return order
}

// @desc Get all orders
// @route GET /orders
// @access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const allOrders = await Order.find({}).populate('user', 'id name')

  res.status(200).json(allOrders)
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
    res.status(201).json({
      message: 'order created successfully',
      _id: order._id
    })
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
  const order = await findOrderItemById(req.params.id, res)

  await order.populate('user', 'name email')
  res.status(200).json(order)
})

// @desc Update order to paid
// @route PUT /orders/:id/pay
// @access Private
const UpdateOrderToPaid = asyncHandler(async (req, res) => {
  const { id = '', status = '', update_time = '', email_address = '' } = req.body
  const order = await findOrderItemById(req.params.id, res)

  order.isPaid = true
  order.paidAt = Date.now()
  order.paymentResult = { id, status, update_time, email_address }

  await order.save()

  console.log('@@@ Updating the order [ PUT /orders/:id/pay ] : ', req.body)
  res.status(200).json({
    message: 'order has been sunccessfully updated for the payment completion.',
    order
  })
})

// @desc Update order to delivered
// @route PUT /orders/:id/deliver
// @access Private/Admin
const UpdateOrderToDelivered = asyncHandler(async (req, res) => {
  const orderId = req.params.id
  const order = await findOrderItemById(orderId, res)

  order.isDelivered = true
  order.deliveredAt = Date.now()
  const updatedOrder = await order.save()

  res.status(200).json(updatedOrder)
})

// @desc Undo various actions related to an order
// @route PUT /orders/:id/undo?action=string
const UndoUpdateOrderAction = asyncHandler(async (req, res) => {
  const orderId = req.params.id || ''
  const { action = '' } = req.query || {}

  if (!action || !['delivered', 'paid'].includes(action)) {
    res.status(400)
    throw new Error('Either action query is required or it is not valid.')
  }

  const order = await findOrderItemById(orderId, res)

  switch (action) {
    case 'delivered': {
      // TODO!!
    }
    case 'paid': {
      order.isPaid = false
      order.paymentResult = { id: '', status: '', update_time: '', email_address: '' }
      delete order.paidAt
    }
  }

  await order.save()
})

module.exports = {
  getAllOrders,
  addOrderItems,
  getMyOrders,
  getOrderById,
  UpdateOrderToPaid,
  UpdateOrderToDelivered,
  UndoUpdateOrderAction
}
