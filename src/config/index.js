const knex = require('knex')
const { ENVIRONMENT } = require('../constants')

const instance = require('./instance')
const MetaQuery = require('../meta-query')

module.exports = new MetaQuery(
  knex, 
  instance[ENVIRONMENT]
)
