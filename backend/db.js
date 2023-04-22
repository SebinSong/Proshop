const mongoose = require('mongoose')
const colors = require('colors')
const { DataBaseStartupError } = require('./errors.js')

exports.connectDB = async (cb) => {
  try {
    const { connection } = await mongoose.connect(process.env.DB_CONNECTION_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: ''
    })

    // register event handlers for DB connection.
    connection.on('disconnected', err => {
      console.error('::: DB disconnected: ', err)
      process.exit(1)
    })

    connection.on('error', err => {
      console.error('::: DB operation error: ', err)
      process.exit(1)
    })
    cb()
  } catch (err) {
    // catches the error from initial connection
    console.error('::: DB startup error: ', error)
    cb(err)
  }
}
