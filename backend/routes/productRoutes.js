const express = require('express')
const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel.js')
const logger = require('morgan')

const router = express.Router()
router.use(logger('dev'))
// @desc    Fetch all products
// @route   GET /products
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
}))

// @desc    Fetch single product
// @route   GET /product/:id
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
  const targetId = req.params.id
  const found = await Product.findById(targetId)

  if (found) { res.json(found) }
  else {
    res.status(404)
    throw new Error('product not found. check the product id you passed in.')
  }
}))

module.exports = router
