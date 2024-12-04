const { APP } = require('../constants')

module.exports = async (req, res, next) => {
  try {
    const headers = req.headers

    if (!headers['secret-key']) {
      throw new Error('Unathorized access, header `secret-key` not found.')
    }

    if (headers['secret-key'] !== APP.SECRET_KEY) {
      throw new Error('Unathorized access, invalid secret key.')
    }

    next()
  } catch (error) {
    res.status(401)
      .send(error.message)
  }
}