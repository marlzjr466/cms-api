const jwt = require('../utilities/jwt')

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']

    if (!authHeader) {
      throw new Error('Unauthorized access. No Authorization header provided.')
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new Error('Unauthorized access. Malformed Authorization header.')
    }

    // Extract the token part
    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new Error('Unauthorized access. Token missing.')
    }

    // Attach user info to the request object
    req.user = jwt.decodeAccessToken(token)

    next()
  } catch (error) {
    res.status(401)
      .send(error.message)
  }
}