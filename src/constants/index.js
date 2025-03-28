require('dotenv').config()

module.exports = {
    DB: {
      HOST: process.env.DB_HOST,
      USER: process.env.DB_USER,
      PASSWORD: process.env.DB_PASSWORD,
      NAME: process.env.DB_NAME,
      URL: process.env.DATABASE_URL
    },

    APP: {
      PORT: process.env.PORT,
      SOCKET_PORT: process.env.SOCKET_PORT
    },

    TOKEN: {
      ACCESS: process.env.ACCESS_TOKEN_SECRET,
      REFRESH: process.env.REFRESH_TOKEN_SECRET
    },

    ENVIRONMENT: process.env.ENVIRONMENT
}