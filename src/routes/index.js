const express = require('express')
const router = express.Router()
const authRoutes = require("./auth.route")
const businessRoutes = require("./business.route")

router.use('/auth', authRoutes)
router.use('/business', businessRoutes)

module.exports = router