const Joi = require('joi')

const socket = require('../../config/socket')
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
      const itemSChema = {
        admin_id: Joi.number()
          .required(),
        first_name: Joi.string()
          .allow("")
          .required(),
        last_name: Joi.string()
          .allow("")
          .required(),
        gender: Joi.string()
          .allow(null)
          .optional(),
        address: Joi.string()
          .allow(null)
          .optional(),
        phone_number: Joi.string()
          .allow(null)
          .optional(),
        birth_date: Joi.date()
          .allow(null)
          .optional()
      }

      const schema = Joi.alternatives().try(
        Joi.object(itemSChema),
        Joi.array().items(
          Joi.object(itemSChema)
        )
      )

      const data = await schema.validateAsync(req.body)
      const response = await service.store({ body: data })

      socket.nsCms.emit('refresh', ['patients'])
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

      socket.nsCms.emit('refresh', ['patients'])

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
  }
}