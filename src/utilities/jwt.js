const jwt = require('jsonwebtoken')

const { TOKEN } = require('../constants')

module.exports = {
    generateAccessToken: function(user) {
        return jwt.sign(user, TOKEN.ACCESS)

        // return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
        // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        // res.json({ accessToken: accessToken, refreshToken: refreshToken })
    }
}