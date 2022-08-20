const express = require('express')
const router = express.Router()
const {isAuthenticated} = require('./../middleware/isAuthenticated.middleware')

const {
    create, 
    getAll, 
    getById, 
    updateDeal
} = require("../controller/deals")

router.use(isAuthenticated)

router.post('/new', create)
router.get('/all', getAll)
router.get('/get/:id', getById)
router.patch('/', updateDeal)

module.exports = router