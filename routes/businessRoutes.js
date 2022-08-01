const express = require('express')
const router = express.Router()

const {createBusiness, getBusiness} = require("../controller/business")
const {requireSignin} = require("../controller/auth")

router.post('/create-business', createBusiness)
router.get('/get-businesses', requireSignin, getBusiness)

module.exports = router