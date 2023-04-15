const mongoose = require('mongoose')

exports.connectDB = async (cb) => {
  try {
    const { connection } = await mongoose.connect(process.env.DB_CONNECTION_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

    console.log(`MongoDB Connected: ${connection.host}`)
    cb()
  } catch (err) {
    // catches the error from initial connection
    cb(err)
  }
}
