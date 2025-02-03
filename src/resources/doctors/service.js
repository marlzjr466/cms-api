const metaQuery = require('../../config')

// utilities
const credentials = require('../../utilities/credentials')
const buffer = require('../../utilities/buffer')

// services
const authService = require('../authentications/service')
const settingsService = require('../settings/service')

module.exports = {
	async list ({ body }) {
		try {
			let list = await metaQuery.list({
        table_name: 'doctors',
        body
      })

      if (body.aggregate && list) {
        list = await metaQuery.aggregateTable({
          list,
          tables: body.aggregate,
          is_first: body.is_first
        })
      }

			if (body.is_count) {
        const { count } = await metaQuery.count({
          table_name: 'doctors',
          body
        })

        return { list, count }
      }

			return list
		} catch (error) {
			throw error
		}
	},

	async store ({ body, trx }) {
		try {
			const [id] = await metaQuery.insert({
        table_name: 'doctors',
        body,
        trx
      })

      const defaultUsername = `${body.first_name.charAt(0).toLowerCase()}_${body.last_name.toLowerCase()}`
      const defaultPassword = '0000'
      const hashPassword = await credentials.hash(defaultPassword)
      
      await authService.store({
        body: {
          doctor_id: id,
          password: hashPassword,
          temp_password: buffer.toBase64(defaultPassword),
          username: defaultUsername
        },
        trx
      })

      await settingsService.store({
        body: { doctor_id: id },
        trx
      })

      return 'OK'
		} catch (error) {
			throw error
		}
	},

  async modify ({ body, trx }) {
    try {
      const options = [
        'id',
        'first_name',
        'last_name',
        'phone_number',
        'deleted_at'
      ]

			const response = await metaQuery.update({
        table_name: 'doctors',
        body,
        options,
        trx
      })

			return response
		} catch (error) {
			throw error
		}
  },

  async delete ({ body, trx }) {
    try {
      const response = await metaQuery.delete({
        table_name: 'doctors',
        body,
        trx
      })

      return response
    } catch (error) {
      throw error
    }
  }
}