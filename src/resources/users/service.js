const metaQuery = require('../../config')

module.exports = {
	async list ({ body }) {
		try {
			let list = await metaQuery.list({
        table_name: 'test',
        body
      })

      if (body.aggregate) {
        list = await metaQuery.aggregateTable({
          list,
          tables: body.aggregate,
          is_first: body.is_first
        })
      }

      if (body.is_count) {
        const { count } = await metaQuery.count({
          table_name: 'test',
          body
        })

        return { list, count }
      }

			return { list }
		} catch (error) {
			throw error
		}
	},

	async store ({ body, trx }) {
		try {
			const response = await metaQuery.insert({
        table_name: 'test',
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
        'name',
        'status'
      ]

			const response = await metaQuery.update({
        table_name: 'test',
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
        table_name: 'test',
        body,
        trx
      })

      return response
    } catch (error) {
      throw error
    }
  }
}