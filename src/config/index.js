const knex = require('knex')

const instance = require('./instance')
const MetaQuery = require('@/meta-query')

module.exports = new MetaQuery(knex, {
  client: 'mysql2',
  connection: instance['DEVELOPMENT']
})
