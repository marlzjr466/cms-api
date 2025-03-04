/*
	* MetaQuery module will dynamically interact
	* with the database using knex package
*/

const { ENVIRONMENT } = require('../constants')

module.exports = class MetaQuery {
  constructor (knex, { client, connection }) {
    this.knex = knex({
			client,
			connection
    })

    this.checkConnection()
  }

  async checkConnection () {
    try {
      await this.knex.raw('SELECT 1+1 AS result')

      if (process.env.ENVIRONMENT === 'prod') {
        console.log('Database connected to supabase successfully!')
      } else {
        console.log('Database connected to mySQLYog successfully!')
      }
    } catch (error) {
      console.error('Database connection failed:', error)
    }
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
          if (item.operator === 'like') {
            query.whereILike(item.field, `%${item.value}%`)
          } else if (item.operator === 'orlike') {
            query.orWhereILike(item.field, `%${item.value || ''}%`)
          } else {
            if (item.value === 'null' && !item.operator) {
              query.where(item.field, null)
            } else {
              query.where(item.field, item.operator || '=', item.value || 0)
            }
          }
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

      if (body.filters) {
        for (const item of body.filters) {
          if (item.operator === 'like') {
            query.whereILike(item.field, `%${item.value}%`)
          } else if (item.operator === 'orlike') {
            query.orWhereILike(item.field, `%${item.value || ''}%`)
          } else {
            if (item.value === 'null' && !item.operator) {
              query.where(item.field, null)
            } else {
              query.where(item.field, item.operator || '=', item.value || 0)
            }
          }
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

      if (ENVIRONMENT === 'prod') {
        const [result] = await query.returning('id')
        return [result.id]
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
    tables
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
            is_first: joinTable.is_first || false,
            filters: filters,
            sort: joinTable.sort || null
          }
  
          if (joinTable.columns) {
            joinBody.columns = joinTable.columns
          }
  
          const joinData = await this.list({
            table_name: joinTable.table,
						body: joinBody,
            aggregate: true
					})

          item[joinTable.table] = joinData || null
        }
      }

      return list
    } catch (error) {
      throw error
    }
  }
}