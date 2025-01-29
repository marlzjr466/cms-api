// require('module-alias/register')

const bootstrap = require('./bootstrap')
const socket = require('./config/socket')
const { APP } = require('./constants')

const apps = [
  { name: 'Server', config: bootstrap, port: APP.PORT },
  { name: 'Socket', config: socket, port: APP.SOCKET_PORT }
]

apps.forEach(app => {
  app.config
    .start(app.port, () => {
      console.log(`${app.name} running at http://localhost:${app.port}`)
    })
})

module.exports = bootstrap.app
