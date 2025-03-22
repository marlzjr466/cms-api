const metaQuery = require('../../config')

// service
const productVariants = require('../product-variants/service')

module.exports = {
	async list ({ body }) {
		try {
			let list = await metaQuery.list({
        table_name: 'products',
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
          table_name: 'products',
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
        table_name: 'products',
        body,
        trx
      })

      const res = await productVariants.store({
        body: { product_id: id }
      })

			return res
		} catch (error) {
			throw error
		}
	},

  async modify ({ body, trx }) {
    try {
      const options = [
        'id',
        'name',
        'description',
        'deleted_at',
        'category_id'
      ]

			const response = await metaQuery.update({
        table_name: 'products',
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
        table_name: 'products',
        body,
        trx
      })

      return response
    } catch (error) {
      throw error
    }
  }
}