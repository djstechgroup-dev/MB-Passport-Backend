const express = require('express')
const router = express.Router()
const isAuthenticated = require('./../middleware/isAuthenticated.middleware')

const {
    create, 
    getAll, 
    getById, 
    updateBusiness
} = require("../controller/business")

router.use(isAuthenticated)

router.post('/new', create)
router.get('/all', getAll)
router.get('/get/:id', getById)
router.patch('/', updateBusiness)

module.exports = router