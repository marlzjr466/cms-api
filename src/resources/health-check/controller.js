const os = require('os')

module.exports = {
  list: async (req, res) => {
    try {
      res.status(200)
        .send({
          status: 'healthy',
          hostname: os.hostname()
        })
    } catch (error) {
      console.log('list: ', error)
      
      res.status(400)
        .send(error.message)
    }
  }
}