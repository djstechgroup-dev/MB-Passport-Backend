const express = require('express')
const router = express.Router()
const authenticated = require('./../middleware/isAuthenticated.middleware')

const {createBusiness, getBusiness} = require("../controller/business")

router.post('/create-business', createBusiness)
router.get('/all', authenticated, getBusiness)

module.exports = router