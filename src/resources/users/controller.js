const Joi = require('joi')

const service = require('./service')

module.exports = {
  list: async (req, res) => {
    try {
      const schema = Joi.object({
        pagination: Joi.object({
          page: Joi.number()
            .required(),
          rows: Joi.number()
            .required()
        })
          .required(),
        is_count: Joi.boolean()
          .optional(),
        is_first: Joi.boolean()
          .optional(),
        columns: Joi.array()
          .items(Joi.string())
          .optional(),
        filter: Joi.array()
          .items(Joi.object({
            field: Joi.string()
              .required(),
            operator: Joi.string()
              .optional(),
            value: Joi.alternatives()
              .try(
                Joi.array(),
                Joi.string(),
                Joi.number()
              )
              .required()
          }))
          .optional(),
        sort: Joi.array()
          .items(Joi.object({
            field: Joi.string()
              .required(),
            direction: Joi.string()
              .allow("asc", "desc")
              .required()
          }))
          .optional(),
        aggregate: Joi.array()
          .items(Joi.object({
            table: Joi.string()
              .required(),
            filters: Joi.array()
              .items(Joi.object({
                field: Joi.string()
                  .required(),
                operator: Joi.string()
                  .optional(),
                value: Joi.string()
                  .required(),
              }))
              .required(),
            columns: Joi.array()
              .items(Joi.string())
              .required()
          }))
          .optional()
      })

      const data = await schema.validateAsync(req.body)
      const response = await service.list({  body: data })

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
      const schema = Joi.alternatives()
        .try(
          Joi.object({
            name: Joi.string()
              .required()
          }),
          Joi.array()
            .items(
              Joi.object({
                name: Joi.string()
                  .required()
              })
            )
        )

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
        data: Joi.alternatives()
          .try(
            Joi.object(),
            Joi.array()
              .items(Joi.object())
          )
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
      const schema = Joi.object({
        key: Joi.string()
          .required(),
        value: Joi.alternatives()
          .try(
            Joi.number(),
            Joi.array()
              .items(Joi.number())
          )
          .required()
      })

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