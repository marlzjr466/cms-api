const express = require('express')
const router = express.Router()

// controller
const controller = require('./controller')

router
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