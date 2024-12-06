const { Server } = require("socket.io")
const moment = require("moment")
const _ = require('lodash')

class Socket {
  constructor () {
    this.client = null
  }

  get namespaces () {
    return new Set([
      'cms'
    ])
  }

  start (port, callback) {
    // const io = new Server(port)
    this.client = new Server(port, {
      transports: ['websocket', 'polling'],
      rejectUnauthorized: false
    })

    this.namespaces.forEach(namespace => {
      const ns = `ns${_.capitalize(namespace)}`
      this[ns] = this.client.of(namespace)

      this[ns].on('connection', socket => {
        // events here
      })
    })

    callback()
  }
}

module.exports = new Socket()