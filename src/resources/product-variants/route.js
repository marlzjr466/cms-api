const express = require('express')
const router = express.Router()

// controller
const controller = require('./controller')

// middleware
const validation = require('../../middlewares/validation')

router
  .use(validation)
  
  .get(
    '/',
    controller.list
  )
  
  .post(
    '/',
    controller.store
  )

  .patch(
    '/',
    controller.patch
  )

  .delete(
    '/',
    controller.delete
  )

module.exports = router