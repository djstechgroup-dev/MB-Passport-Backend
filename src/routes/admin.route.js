const express = require('express')
const router = express.Router()

const {firebaseAuth} = require('./../middleware/isAuthenticated.middleware')
const {isAdmin} = require('./../middleware/isAdmin.middleware')

const {
    getAllDeals,
    getAllBusiness
} = require("../controller/admin")

router.use(firebaseAuth)
router.use(isAdmin)

router.get('/deals', getAllDeals)
router.get('/business', getAllBusiness)


module.exports = router