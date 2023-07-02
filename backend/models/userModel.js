const mongoose = require('mongoose')
const { hashPassword } = require('../utils/encrypt-utils')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false }
}, {
  timestamps: true
})

// methods
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// pre
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  // Hash the password before saving it to the DB.
  this.password = await hashPassword(this.password)
})

const User = mongoose.model('User', userSchema)

module.exports = User