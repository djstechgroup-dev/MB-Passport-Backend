const express = require('express')
const router = express.Router()
const {isAuthenticated, firebaseAuth} = require('../middleware/isAuthenticated.middleware')

const {
    myBusiness
} = require("../controller/merchant")

const {getById} = require('./../controller/business')

router.use(firebaseAuth)
router.get('/my-business', myBusiness)
router.get('/my-business/:id', getById)

module.exports = router