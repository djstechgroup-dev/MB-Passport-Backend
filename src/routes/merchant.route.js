const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middleware/isAuthenticated.middleware')

const {
    myBusiness
} = require("../controller/merchant")

router.use(isAuthenticated)
router.get('/my-business', myBusiness)

module.exports = router