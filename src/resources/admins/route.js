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

  .get(
    '/dashboard-data',
    controller.dashboardData
  )

  .get(
    '/online-staff',
    controller.onlineStaff
  )

module.exports = router