const Joi = require('joi')

const service = require('./service')

module.exports = {
  list: async (req, res) => {
    try {
      const decodedParams = JSON.parse(atob(req.query.data))
      const response = await service.list({ body: decodedParams })

      res.status(200)
        .send(response)
    } catch (error) {
      console.log('list: ', error)
      
      res.status(400)
        .send(error.message)
    }
  },

  store: async (req, res) => {
    try {
      const schema = Joi.object({
        first_name: Joi.string()
          .required(),
        last_name: Joi.string()
          .required(),
        phone_number: Joi.string()
          .optional()
      })

      const data = await schema.validateAsync(req.body)
      const response = await service.store({ body: data })

      res.status(200)
        .send(response)
    } catch (error) {
      console.log('store: ', error)
      
      res.status(400)
        .send(error.message)
    }
  },

  patch: async (req, res) => {
    try {
      const schema = Joi.object({
        key: Joi.string()
          .required(),
        data: Joi.object()
          .required()
      })

      const data = await schema.validateAsync(req.body)
      const response = await service.modify({ body: data })

      res.status(200)
        .send(response)
    } catch (error) {
      console.log('patch: ', error)
      
      res.status(400)
        .send(error.message)
    }
  },

  delete: async (req, res) => {
    try {
      const schema = Joi.object({})

      const data = await schema.validateAsync(req.body)
      const response = await service.delete({ body: data })

      res.status(200)
        .send(response)
    } catch (error) {
      console.log('delete: ', error)
      
      res.status(400)
        .send(error.message)
    }
  },

  dashboardData: async (req, res) => {
    try {
      const id = req.user.admin_id
      const response = await service.dashboardData(id)

      res.status(200)
        .send(response)
    } catch (error) {
      console.log('dashboardData: ', error)
      
      res.status(400)
        .send(error.message)
    }
  },

  onlineStaff: async (req, res) => {
    try {
      const id = req.user.admin_id
      const response = await service.onlineStaff(id)

      res.status(200)
        .send(response)
    } catch (error) {
      console.log('onlineStaff: ', error)
      
      res.status(400)
        .send(error.message)
    }
  }
}