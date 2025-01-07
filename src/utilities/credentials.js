const bcrypt = require('bcrypt')

async function verify ({ password, hash }) {
  const isPasswordMatch = await bcrypt.compare(password, hash)

  return isPasswordMatch
}

async function hash (password, saltRounds = 10) {
  const salt = bcrypt.genSaltSync(saltRounds)
  return bcrypt.hashSync(password, salt)
}

module.exports = {
  verify,
  hash
}