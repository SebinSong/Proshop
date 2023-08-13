const Product = require('../models/productModel')
const asyncHandler = require('../middlewares/asyncHandler')

const findProductById = async (id, res) => {
  const product = await Product.findById(id)

  if (!product) {
    res.status(404)
    throw new Error (`product with the request ID - [${id}] cannot be found.`)
  }

  return product
}

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
  const foundProduct = await findProductById(req.params.id, res)
  res.status(200).json(foundProduct)
})

// @desc Create a new product
// @route POST /products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const data = req.body
  const product = new Product({
    name: 'Sample product',
    price: 0,
    user: req.user._id,
    image: '',
    category: 'sample',
    brand: 'sample brand',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description'
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc Update product details
// @route PUT /products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const targetProduct = await findProductById(req.params.id)
  
  for (const [key, value] of Object.entries(req.body)) {
    targetProduct[key] = value
  }

  const updatedProduct = await targetProduct.save()
  res.status(200).json(updatedProduct)
})

// @desc Delete a product
// @route DELETE /products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id
  const product = await Product.findById(productId)
  
  if (product) {
    await Product.deleteOne({ _id: product._id })
  }

  res.status(204).json({
    message: `Successfully deleted the product [${productId}]`
  })
})

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}
