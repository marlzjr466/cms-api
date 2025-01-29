const { DB } = require('@/constants')

const instance = {
	DEVELOPMENT: {
		client: 'mysql2',
		connection: {
			host: DB.HOST,
			user: DB.USER,
			password: DB.PASSWORD,
			database: DB.NAME
		}
	},

	PRODUCTION: {
		client: 'pg',
		connection: {
			connectionString: DB.URL, // Load from environment variables
			ssl: { rejectUnauthorized: false } // Required for Supabase
		}
	}
}

module.exports = instance