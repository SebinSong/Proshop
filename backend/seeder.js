const dotenv = require('dotenv')
const colors = require('colors')

// data
const users = require('./data/users.js')
const products = require('./data/products.js')

// models
const User = require('./models/userModel.js')
const Product = require('./models/productModel.js')
const Order = require('./models/orderModel.js')

const { connectDB } = require('./db.js')
dotenv.config()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    console.log('- DB cleared.'.magenta.underline)

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers.find(user => user.isAdmin)

    const sampleProducts = products.map(product => {
      return {
        ...product,
        user: adminUser
      }
    })

    await Product.insertMany(sampleProducts)

    console.log(`- Seeder data has been successfully imported to '${process.env.DB_NAME}' database`.brightGreen.inverse)
    process.exit()
  } catch (err) {
    console.log(`::: ERR while importing data to DB - ${err}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('- DB cleared.'.magenta.underline)
    process.exit()
  } catch (err) {
    console.log(`${err}`.red.inverse)
    process.exit(1)
  } 
}

connectDB(() => {
  console.log('- DB successfully connected'.brightYellow.underline)
}).then(() => {
  if (process.argv[2] === '-d') {
    destroyData()
  } else {
    importData()
  }  
})
