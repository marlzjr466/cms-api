const { DB } = require('../constants')

const instance = {
	DEVELOPMENT: {
		host: DB.HOST,
		user: DB.USER,
		password: DB.PASSWORD,
		database: DB.NAME
	},

	PRODUCTION: {
		host: DB.HOST,
		user: DB.USER,
		password: DB.PASSWORD,
		database: DB.NAME
	}
}

module.exports = instance