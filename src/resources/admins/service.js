const metaQuery = require('../../config')

module.exports = {
	async list ({ body }) {
		try {
			let list = await metaQuery.list({
        table_name: 'admins',
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
          table_name: 'admins',
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
        table_name: 'admins',
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
        'first_name',
        'last_name',
        'phone_number',
        'deleted_at'
      ]

			const response = await metaQuery.update({
        table_name: 'admins',
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
        table_name: 'admins',
        body,
        trx
      })

      return response
    } catch (error) {
      throw error
    }
  },

  async dashboardData (id) {
    try {
      const [result] = await metaQuery.raw(`
        select 
          (select count(*) from patients where admin_id = ${id}) as total_patients,
          (select sum(stock) from product_items where expired_at > now()) as inventory,
          (select sum(amount) from transactions) as overall_sales,
          (select sum(amount) from transactions where DATE(created_at) = curdate()) as todays_sales,
          (select count(*) from records where DATE(created_at) = curdate()) as todays_patients
      `)

      return {
        patientsCount: result.total_patients,
        inventoryCount: result.inventory,
        todaysPatientsCount: result.todays_patients,
        overallSales: result.overall_sales,
        todaysTotalSales: result.todays_sales
      }
    } catch (error) {
      throw error
    }
  },

  async onlineStaff (id) {
    try {
      const result = await metaQuery.raw(`
        select a.first_name, a.last_name, 'attendant' as role
          from attendants a
          join authentications auth on a.id = auth.attendant_id
          where a.admin_id = ${id} and auth.status = 'online'

        union

        select d.first_name, d.last_name, 'doctor' AS role
          from doctors d
          join authentications auth on d.id = auth.doctor_id
          where d.admin_id = ${id} and auth.status = 'online'
      `)

      return result
    } catch (error) {
      throw error
    }
  }
}