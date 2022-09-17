const express = require('express')
const router = express.Router()

const {firebaseAuth} = require('./../middleware/isAuthenticated.middleware')

const {
    me,
    getAllDeals,
    getAllBusiness
} = require("../controller/user")

router.use(firebaseAuth)

router.get('/me', me)
router.get('/deals', getAllDeals)
router.get('/business', getAllBusiness)


module.exports = router