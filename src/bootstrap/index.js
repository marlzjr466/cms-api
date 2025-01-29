const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { glob } = require('glob')

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

    /*
      * Tracks the requested routes,
      * import all route files in every module in resources
      * then init all routes
    */
    const routes = await glob('**/resources/**/route.js', { absolute: true })
    routes.forEach(path => {
      // init route path
      const router = require(path)

      // extract the module name to be use as prefix
      const [prefix] = path.split('\\').slice(-2)

      // init prefix and router
      this.app
        .use(`/${prefix}`, router)
    })
  
    // Listening to port
    this.app
      .listen(port, callback())
  }
}

module.exports = new Bootstrap()