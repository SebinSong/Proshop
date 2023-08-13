const express = require('express')
const logger = require('morgan')
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
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

module.exports = router
