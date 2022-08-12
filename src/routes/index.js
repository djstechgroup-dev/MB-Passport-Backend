const express = require('express')
const router = express.Router()
const authRoutes = require("./auth.route")
const businessRoutes = require("./business.route")
const dealRoutes = require('./deal.route')

router.use('/auth', authRoutes)
router.use('/business', businessRoutes)
router.use('/deal', dealRoutes)

module.exports = router