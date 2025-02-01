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