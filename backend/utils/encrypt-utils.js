const bcrypt = require('bcryptjs')

const SALT_LENGTH = 10

exports.hashPassword = async pw => {
  const salt = await bcrypt.genSalt(SALT_LENGTH)
  return await bcrypt.hash(pw, salt)
}

exports.hashPasswordSync = pw => {
  return bcrypt.hashSync(pw, SALT_LENGTH)
}
