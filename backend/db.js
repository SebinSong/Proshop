const mongoose = require('mongoose')
const colors = require('colors')

exports.connectDB = async (cb) => {
  try {
    const { connection } = await mongoose.connect(process.env.DB_CONNECTION_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

    console.log(`MongoDB Connected: ${connection.host}`.bold.cyan)
    cb()
  } catch (err) {
    // catches the error from initial connection
    cb(err)
  }
}
