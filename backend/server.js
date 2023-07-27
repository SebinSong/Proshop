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

// import middlewares
const { notFound, errorHandler } = require('./middlewares/errorMiddleware.js')

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const {
  API_PORT = 5000,
  NODE_ENV = 'development'
} = process.env

const app = express()

// request parser middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// register routes
app.get('/', (req, res) => {
  res.send('API is running')
})
app.use('/product(s)?', productRouter) // products API
app.use('/users', userRouter)
app.use('/orders', orderRouter)

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
