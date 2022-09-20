const express = require('express')
const router = express.Router()

const adminRoutes = require("./admin.route")
const userRoutes = require("./user.route")
const authRoutes = require("./auth.route")
const businessRoutes = require("./business.route")
const locationRoutes = require("./location.route")
const dealRoutes = require('./deal.route')
const merchantRoutes = require('./merchant.route')
const categoryRoutes = require('./category.route')

router.use('/', userRoutes)

router.use('/auth', authRoutes)

router.use('/admin', adminRoutes)

router.use('/business', businessRoutes)
router.use('/location', locationRoutes)
router.use('/deal', dealRoutes)
router.use('/merchant', merchantRoutes)
router.use('/category', categoryRoutes)

module.exports = router