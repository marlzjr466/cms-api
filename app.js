const bootStrap = require('./src/bootstrap')
const { APP } = require('./src/constants')

bootStrap.start(
  APP.PORT,
  () => console.log(`Server is running in PORT ${APP.PORT}`)
)
