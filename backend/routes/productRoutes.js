const express = require('express')
const logger = require('morgan')
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview
} = require('../controllers/productController')
const { admin, protect } = require('../middlewares/authMiddleWare.js')

const router = express.Router()
router.use(logger('dev'))
router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct)

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)

router.route(':id/reviews')
  .post(protect, createProductReview)
module.exports = router
