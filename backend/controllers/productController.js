const Product = require('../models/productModel')
const asyncHandler = require('../middlewares/asyncHandler')

// @desc    Fetch all products
// @route   GET /products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}) || []
  res.json(products)
})

// @desc    Fetch single product
// @route   GET /product/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const targetId = req.params.id
  const found = await Product.findById(targetId)

  if (found) { res.json(found) }
  else {
    res.status(404)
    throw new Error('product not found. check the product id you passed in.')
  }
})

module.exports = {
  getProducts,
  getProductById
}
