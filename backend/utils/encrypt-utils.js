const bcrypt = require('bcryptjs')

exports.hashPassword = pw => bcrypt.hashSync(pw, 10)
