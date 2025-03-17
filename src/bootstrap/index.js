const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

// routes
const admins = require('../resources/admins/route')
const authentications = require('../resources/authentications/route')
const doctors = require('../resources/doctors/route')
const attendants = require('../resources/attendants/route')
const healthCheck = require('../resources/health-check/route')
const settings = require('../resources/settings/route')
const productCategories = require('../resources/product-categories/route')
const products = require('../resources/products/route')
const productVariants = require('../resources/product-variants/route')
const productItems = require('../resources/product-items/route')
const patients = require('../resources/patients/route')
const records = require('../resources/records/route')
const queues = require('../resources/queues/route')
const transactions = require('../resources/transactions/route')

class Bootstrap {
  constructor () {
    this.app = express()
  }

  async start (port, callback) {
    this.app
      // Used to handle cross domain
      .use(cors())

      // Used to accept data as json
      .use(bodyParser.json())

      // Used to handle form data
      .use(bodyParser.urlencoded({ extended: true }))

      // Parse an HTML body into a string
      .use(bodyParser.text({ type: '*/*' }))

      // log all requests
      .use(morgan('dev'))

      // manually added all the routes
      .use('/admins', admins)
      .use('/authentications', authentications)
      .use('/doctors', doctors)
      .use('/attendants', attendants)
      .use('/health-check', healthCheck)
      .use('/settings', settings)
      .use('/categories', productCategories)
      .use('/products', products)
      .use('/product-variants', productVariants)
      .use('/product-items', productItems)
      .use('/patients', patients)
      .use('/records', records)
      .use('/queues', queues)
      .use('/transactions', transactions)

      // routes.forEach(route => {
      //   this.app
      //     .use(`/${route.prefix}`, route.path)
      // })

    /*
      * Tracks the requested routes,
      * import all route files in every module in resources
      * then init all routes
    */
    // const routes = await glob('**/resources/**/route.js', { absolute: true })
    // routes.forEach(path => {
    //   const router = require(path)

    //   const [prefix] = path.split('\\').slice(-2)

    //   this.app
    //     .use(`/${prefix}`, router)
    // })
  
    // Listening to port
    // this.app
    //   .listen(port, callback())
  }
}

module.exports = new Bootstrap()