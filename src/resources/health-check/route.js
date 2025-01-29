const express = require('express')
const router = express.Router()

// controller
const controller = require('./controller')

router
  .get(
    '/',
    controller.list
  )

module.exports = router