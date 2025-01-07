/*
	* MetaQuery module will dynamically interact
	* with the database using knex package
*/

module.exports = class MetaQuery {
  constructor (knex, { client, connection }) {
    this.knex = knex({
			client,
			connection
    })
  }

  async trx () {
    const trxProvider =  this.knex.transactionProvider()
    const trx = await trxProvider()

    return trx
  }

  async list ({
    table_name: tableName,
    body,
    aggregate
  }) {
    try {
      const query = this.knex(tableName)

      if (body.columns) {
        query.select(body.columns)
      }

      if (body.filters) {
        for (const item of body.filters) {
          query.where(item.field, item.operator || '=', item.value || 0)
        }
      }

      if (body.sort) {
        for (const item of body.sort) {
          query.orderBy(item.field, item.direction)
        }
      }

      if (body.pagination && !aggregate) {
        query.limit(body.pagination.rows)
          .offset((body.pagination.page - 1) * body.pagination.rows)
      }
      
      if (body.is_first) {
        query.first()
      }

      const result = await query
      return result
    } catch (error) {
      throw error
    }
  }

  async count ({
    table_name: tableName,
    body
  }) {
    try {
      const query = this.knex(tableName)

      if (body.filter) {
        for (const item of body.filter) {
          query.where(item.field, item.operator || '=', item.value || 0)
        }
      }

      const result = await query.count('id as count')
        .first()

      return result
    } catch (error) {
      throw error
    }
  }

  async insert ({
		table_name: tableName,
		body,
		on_conflict_ignore: onConflictIgnore = null,
    trx = this.knex
	}) {
    try {
			const query = trx(tableName)
				.insert(body)

			if (onConflictIgnore) {
				query.onConflict(onConflictIgnore)
					.ignore()
			}

			return await query
		} catch (error) {
			throw error
		}
  }

  async update ({
    table_name: tableName,
    body,
    options,
    trx = this.knex
  }) {
    try {
      const data = body.data.length
        ? body.data
        : [body.data]

      for (const item of data) {
        if (!(body.key in item)) {
          throw new Error('Key `'+ body.key +'` is not found in the object data.')
        }

        for (const option in item) {
          if (!options.includes(option)) {
            throw new Error('Option `'+ option +'` is not allowed!')
          }
        }

        await trx(tableName)
          .where(body.key, item[body.key])
          .update(item)
      }

      return 'OK'
    } catch (error) {
      throw error
    }
  }

	async delete ({
    table_name: tableName,
    body,
    trx = this.knex
  }) {
    try {
      const value = (typeof body.value == 'object')
        ? body.value
        : [body.value]

      for (const item of value) {
        await trx(tableName)
          .del()
          .where(body.key, item)
      }

      return 'OK'
    } catch (error) {
      throw error
    }
  }

  async raw (rawQuery) {
    try {
      const [result] = await this.knex
        .raw(rawQuery)
      
      return result
    } catch (error) {
      throw error
    }
  }

  async aggregateTable ({
    list,
    tables,
    is_first: isFirst = false
  }) {
    try {
      const dataList = list.length
        ? list
        : [list]

      for (const item of dataList) {
        for (const joinTable of tables) {
          const filters = joinTable.filters.map(filter => {
            return {
              field: filter.field,
              operator: filter.operator,
              value: item[filter.key]
            }
          })

          const joinBody = {
            is_first: true,
            filters: filters
          }
  
          if (joinTable.columns) {
            joinBody.columns = joinTable.columns
          }
  
          const joinData = await this.list({
            table_name: joinTable.table,
						body: joinBody,
            aggregate: true
					})
          item[joinTable.table] = joinData
        }
      }

      return list
    } catch (error) {
      throw error
    }
  }
}