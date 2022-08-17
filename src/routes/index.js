const express = require('express')
const router = express.Router()
const authRoutes = require("./auth.route")
const businessRoutes = require("./business.route")
const dealRoutes = require('./deal.route')
const merchantRoutes = require('./merchant.route')

router.use('/auth', authRoutes)
router.use('/business', businessRoutes)
router.use('/deal', dealRoutes)
router.use('/merchant', merchantRoutes)

module.exports = router