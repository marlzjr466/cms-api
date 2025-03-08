const metaQuery = require('../../config')

// utilities
const credentials = require('../../utilities/credentials')
const jwt = require('../../utilities/jwt')
const buffer = require('../../utilities/buffer')

// services
const adminService = require('../admins/service')
const settingsService = require('../settings/service')
const clinicService = require('../clinic/service')

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
        'attendant_id',
        'password',
        'temp_password',
        'username'
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
      const cols = ['id', 'first_name', 'last_name', 'phone_number', 'created_at']
      if (body.role === 'doctor') {
        cols.push('admin_id')
      }
      const auth = await this.list({
        is_first: true,
        filters: [
          {
            field: 'username',
            value: body.username
          }
        ],
        columns: ['id', 'username', 'password', 'admin_id', 'doctor_id'], 
        aggregate: [
          {
            is_first: true,
            table: `${body.role}s`,
            filters: [
              {
                field: 'id',
                key: `${body.role}_id`
              }
            ],
            columns: cols, 
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

      const adminId = body.role === 'doctor' ? auth[`${body.role}s`].admin_id : auth.admin_id
      const clinic = await clinicService.list({
        is_first: true,
        filters: [
          {
            field: 'admin_id',
            value: adminId
          }
        ],
        columns: ['name', 'address']
      })

      const tokenize = {
        id: auth.id,
        username: auth.username,
        admin_id: adminId,
        first_name: auth[`${body.role}s`].first_name,
        last_name: auth[`${body.role}s`].last_name,
        phone_number: auth[`${body.role}s`].phone_number,
        clinic_name: clinic.name,
        clinic_address: clinic.address,
        role: body.role,
        created_at: auth[`${body.role}s`].created_at
      }

      if (body.role === 'doctor') {
        tokenize.doctor_id = auth[`${body.role}s`].id
      }

      const accessToken = jwt.generateAccessToken(tokenize)

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
    if (body.role !== 'admin') {
      throw new Error('Invalid role')
    }
    
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
      
      await settingsService.store({
        body: { admin_id: id },
        trx
      })

      trx.commit()
      return 'OK'
    } catch (error) {
      trx.rollback()

      console.log('error:', error)
      throw error
    }
  },

  async changePassword ({ body }) {
    try {
      let data = {
        id: body.id,
        username: body.username,
      }

      if (body.password) {
        const hashPassword = await credentials.hash(body.password)

        data = {
          ...data,
          password: hashPassword,
          temp_password: buffer.toBase64(body.password)
        }
      }

      await this.modify({
        body: {
          key: 'id',
          data
        }
      })

      return 'OK'
    } catch (error) {
      console.log('error------:', error)
      throw error
    }
  }
}