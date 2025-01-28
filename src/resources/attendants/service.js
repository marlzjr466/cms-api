const metaQuery = require('@/config')

// utilities
const credentials = require('@/utilities/credentials')
const buffer = require('@/utilities/buffer')

// services
const authService = require('@/resources/authentications/service')
const settingsService = require('@/resources/settings/service')

module.exports = {
	async list ({ body }) {
		try {
			let list = await metaQuery.list({
        table_name: 'attendants',
        body
      })

      if (body.aggregate && list) {
        list = await metaQuery.aggregateTable({
          list,
          tables: body.aggregate,
          is_first: body.is_first
        })

        list = list.map(item => {
          let temp = {}
          for (const x of body.aggregate) {
            temp = {...temp, ...item[x.table]}
          }

          const updated = {...item, ...temp}
          for (const x of body.aggregate) {
            delete updated[x.table]
          }

          return updated
        })
      }

			if (body.is_count) {
        const { count } = await metaQuery.count({
          table_name: 'attendants',
          body
        })

        return { list, count }
      }

			return list
		} catch (error) {
			throw error
		}
	},

	async store ({ body }) {
    const trx = await metaQuery.trx()

		try {
			const [id] = await metaQuery.insert({
        table_name: 'attendants',
        body,
        trx
      })
      
      const defaultUsername = `${body.first_name.charAt(0).toLowerCase()}_${body.last_name.toLowerCase()}`
      const defaultPassword = '0000'
      const hashPassword = await credentials.hash(defaultPassword)
      
      await authService.store({
        body: {
          attendant_id: id,
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

      trx.commit()
      return 'OK'
		} catch (error) {
      trx.rollback()

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
        table_name: 'attendants',
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
        table_name: 'attendants',
        body,
        trx
      })

      return response
    } catch (error) {
      throw error
    }
  }
}