const express = require('express')
const logger = require('morgan')
const { getProducts, getProductById } = require('../controllers/productController')

const router = express.Router()
router.use(logger('dev'))
router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

module.exports = router
