const path = require('path')
const express = require('express')
const multer = require('multer')
const { admin, protect } = require('../middlewares/authMiddleWare.js')
const asyncHandler = require('../middlewares/asyncHandler')

const router = express.Router()

// multer utilities
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage })

const checkFileType = (file, cb) => {
  const validFileTypes = /jpg|jpeg|png/
  const extensionValid = validFileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimeTypeValid = validFileTypes.test(file.mimetype)

  if (extensionValid && mimeTypeValid) {
    return cb(null, true)
  } else {
    cb(new Error ('Only image types are acceptable.'))
  }
}

router.route('/').post(
  protect, admin,
  upload.single('image'),
  asyncHandler(async (req, res) => {
    res.status(201).json({
      image: `/uploads/${req.file.filename}`,
      message: 'Image uploaded!'
    })
  })
)

module.exports = router

