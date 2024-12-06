const Joi = require('joi')

const service = require('./service')

module.exports = {
  list: async (req, res) => {
    try {
      const schema = Joi.object({})

      const data = await schema.validateAsync(req.body)
      const response = await service.list({ body: data })

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
      const schema = Joi.object({})

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
      const schema = Joi.object({})

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
  }
}