const metaQuery = require('../../config')

module.exports = {
	async list ({ body }) {
		try {
			let list = await metaQuery.list({
        table_name: 'transactions',
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
          table_name: 'transactions',
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
			const response = await metaQuery.insert({
        table_name: 'transactions',
        body,
        trx
      })

			return response
		} catch (error) {
			throw error
		}
	},

  async modify ({ body, trx }) {
    try {
      const options = [
        'id',
        'record_id',
        'amount',
        'consultation_price',
        'status',
        'attendant_id',
        'products_metadata'
      ]

			const response = await metaQuery.update({
        table_name: 'transactions',
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
        table_name: 'transactions',
        body,
        trx
      })

      return response
    } catch (error) {
      throw error
    }
  }
}