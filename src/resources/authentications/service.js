const metaQuery = require('@/config')

// utilities
const credentials = require('@/utilities/credentials')
const jwt = require('@/utilities/jwt')
const buffer = require('@/utilities/buffer')

// services
const adminService = require('@/resources/admins/service')

module.exports = {
	async list (body) {
		try {
			let list = await metaQuery.list({
        table_name: 'authentications',
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
          table_name: 'authentications',
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
        table_name: 'authentications',
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
        'access_token',
        'status',
        'admin_id',
        'doctor_id',
        'attendant_id'
      ]

			const response = await metaQuery.update({
        table_name: 'authentications',
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
        table_name: 'authentications',
        body,
        trx
      })

      return response
    } catch (error) {
      throw error
    }
  },

  async login ({ body }) {
    const trx = await metaQuery.trx()

    try {
      const auth = await this.list({
        is_first: true,
        filters: [
          {
            field: 'username',
            value: body.username
          }
        ],
        columns: ['id', 'username', 'password', 'admin_id'], 
        aggregate: [
          {
            table: `${body.role}s`,
            filters: [
              {
                field: 'id',
                key: `${body.role}_id`
              }
            ],
            columns: ['id', 'first_name', 'last_name', 'created_at'], 
          }
        ]
      })
  
      if (!auth) {
        throw new Error('Invalid username')
      }

      const isPasswordMatch = await credentials.verify({
        password: body.password,
        hash: auth.password
      })

      if (!isPasswordMatch) {
        throw new Error('Invalid password')
      }

      const accessToken = jwt.generateAccessToken({
        id: auth.id,
        admin_id: auth.admin_id,
        first_name: auth.admins.first_name,
        last_name: auth.admins.last_name,
        role: body.role,
        created_at: auth.admins.created_at
      })

      await this.modify({
        body: {
          key: 'id',
          data: {
            id: auth.id,
            access_token: accessToken,
            status: 'online'
          }
        },
        trx
      })

      trx.commit()
      return { token: accessToken }
    } catch (error) {
      trx.rollback()
      throw error
    }
  },

  async logout (userId) {
    try {
      await this.modify({
        body: {
          key: 'id',
          data: {
            id: userId,
            access_token: null,
            status: 'offline'
          }
        }
      }) 

      return 'OK'
    } catch (error) {
      throw error
    }
  },

  async createAdmin({ body }) {
    const trx = await metaQuery.trx()

    try {
      const doesExist = await this.list({
        is_first: true,
        filters: [
          {
            field: 'username',
            value: body.username
          }
        ]
      })

      if (doesExist) {
        throw new Error('The username is already registered!')
      }

      const [id] = await adminService.store({
        body: {
          first_name: body.first_name,
          last_name: body.last_name
        },
        trx
      })

      if (body.role !== 'admin') {
        throw new Error('Invalid role')
      }

      const hashPassword = await credentials.hash(body.password)

      await this.store({
        body: {
          admin_id: id,
          password: hashPassword,
          temp_password: buffer.toBase64(body.password),
          username: body.username
        },
        trx
      })

      trx.commit()
      return 'OK'
    } catch (error) {
      trx.rollback()
      throw error
    }
  }
}