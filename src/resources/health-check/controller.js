module.exports = {
  list: async (req, res) => {
    try {
      res.status(200)
        .send({
          status: 'API is healthy...'
        })
    } catch (error) {
      console.log('list: ', error)
      
      res.status(400)
        .send(error.message)
    }
  }
}