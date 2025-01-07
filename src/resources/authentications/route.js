const express = require('express')
const router = express.Router()

// controller
const controller = require('./controller')

// middleware
const validation = require('@/middlewares/validation')

router
  .get(
    '/',
    validation,
    controller.list
  )
  
  .post(
    '/',
    validation,
    controller.store
  )

  .patch(
    '/',
    validation,
    controller.patch
  )

  .delete(
    '/',
    validation,
    controller.delete
  )

  .post(
    '/login',
    controller.login
  )

  .post(
    '/logout',
    validation,
    controller.logout
  )

  .post(
    '/create-admin',
    controller.createAdmin
  )

module.exports = router