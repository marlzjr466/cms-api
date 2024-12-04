const bcrypt = require('bcrypt')

async function comparePassword (reqPass, dbPass) {
  const isPasswordMatch = await bcrypt.compare(reqPass, dbPass)

  return isPasswordMatch
}

module.exports = {
  comparePassword
}