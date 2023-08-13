const path = require('path')
const colors = require('colors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const express = require('express')
const { connectDB } = require('./db.js')

// import routes
const productRouter = require('./routes/productRoutes.js')
const userRouter = require('./routes/userRoutes.js')
const orderRouter = require('./routes/orderRoutes.js')
const uploadRouter = require('./routes/uploadRoutes.js')

// import middlewares
const { notFound, errorHandler } = require('./middlewares/errorMiddleware.js')

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const {
  API_PORT = 5000,
  NODE_ENV = 'development',
  PAYPAL_CLIENT_ID
} = process.env

const app = express()
const dirName = path.resolve()

// request parser middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/config/paypal', (req, res) => {
  if (!PAYPAL_CLIENT_ID) {
    res.status(503)
    throw new Error('server could not find the available paypal client ID.')
  } else {
    res.status(200).json({ clientId: PAYPAL_CLIENT_ID })
  }
})

// register routes
app.get('/', (req, res) => {
  res.send('API is running')
})
app.use('/product(s)?', productRouter) // products API
app.use('/users', userRouter)
app.use('/orders', orderRouter)
app.use('/fileupload', uploadRouter)

// serve-static for '/uploads' endpoint
app.use('/uploads',
  (req, res, next) => {
    console.log('@@@ uploaded image is requested!!: ', req.method, req.url)
    console.log('@@@ serve-static dirname: ', path.join(__dirname, '/uploads'))
    next()
  },
  express.static(path.join(__dirname, '/uploads'))
)


// error handler
app.use(notFound)
app.use(errorHandler)

// connect to db and run the server
connectDB((err) => {
  if (err) {
    console.error('error ocurred while connecting to DB: '.underline.bold.red, err)
    process.exit(1)
  }

  console.log('- successfully connected to DB..!'.brightYellow.underline)
  app.listen(API_PORT, () => { console.log(`Server running in ${NODE_ENV} mode on port ${API_PORT}.`.bold.yellow.underline) })
})
