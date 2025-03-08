const Joi = require('joi')

const service = require('./service')

module.exports = {
  list: async (req, res) => {
    try {
      const schema = Joi.object({})

      const data = await schema.validateAsync(req.body)
      const response = await service.list(data)

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

  login: async (req, res) => {
    try {
      const schema = Joi.object({
        username: Joi.string()
          .required(),
        password: Joi.string()
          .required(),
        role: Joi.string()
          .valid('doctor', 'admin', 'attendant')
          .required()
      })

      const data = await schema.validateAsync(req.body)
      const response = await service.login({ body: data })

      res.status(200)
        .send(response)
    } catch (error) {
      res.status(400)
        .send(error.message)
    }
  },

  logout: async (req, res) => {
    try {
      const schema = Joi.object({
        user_id: Joi.number()
          .required()
      })

      const data = await schema.validateAsync(req.body)
      const response = await service.logout(data.user_id)

      res.status(200)
        .send(response)
    } catch (error) {
      res.status(400)
        .send(error.message)
    }
  },

  createAdmin: async (req, res) => {
    try {
      const schema = Joi.object({
        first_name: Joi.string()
          .required(),
        last_name: Joi.string()
          .required(),
        username: Joi.string()
          .required(),
        clinic_name: Joi.string()
          .required(),
        clinic_address: Joi.string()
          .required(),
        role: Joi.string()
          .valid('admin')
          .required(),
        password: Joi.string()
          .required()
      })

      const data = await schema.validateAsync(req.body)
      const response = await service.createAdmin({ body: data })

      res.status(200)
        .send(response)
    } catch (error) {
      res.status(400)
        .send(error.message)
    }
  },

  changePassword: async (req, res) => {
    try {
      const schema = Joi.object({
        id: Joi.number()
          .required(),
        username: Joi.string()
          .optional(),
        password: Joi.string()
          .optional()
          .allow('')
      })

      const data = await schema.validateAsync(req.body)
      const response = await service.changePassword({ body: data })

      res.status(200)
        .send(response)
    } catch (error) {
      console.log('patch: ', error)
      
      res.status(400)
        .send(error.message)
    }
  },
}