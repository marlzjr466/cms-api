require('dotenv').config()

module.exports = {
    DB: {
        HOST: process.env.DB_HOST,
        USER: process.env.DB_USER,
		PASSWORD: process.env.DB_PASSWORD,
		NAME: process.env.DB_NAME
    },

    APP: {
        PORT: process.env.PORT
    },

    TOKEN: {
      ACCESS: process.env.ACCESS_TOKEN_SECRET,
      REFRESH: process.env.REFRESH_TOKEN_SECRET
    }
}