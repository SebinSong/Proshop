const { hashPasswordSync } = require('../utils/encrypt-utils')

const users = [
  {
    name: 'Admin user',
    email: 'admin@example.com',
    password: hashPasswordSync('123456'),
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: hashPasswordSync('123456'),
  },
  {
    name: 'Jane Doe second',
    email: 'jane123@example.com',
    password: hashPasswordSync('123456')
  }
]

module.exports = users