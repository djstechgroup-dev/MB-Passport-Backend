const express = require('express')
const router = express.Router()
const {isAuthenticated, firebaseAuth} = require('./../middleware/isAuthenticated.middleware')

const {
    create, 
    getAll, 
    getById, 
    updateBusiness
} = require("../controller/business")

const {
    addLocation
} = require("../controller/locations")

router.use(firebaseAuth)

router.post('/new', create)
router.post('/add-location', addLocation)
router.get('/all', getAll)
router.get('/get/:id', getById)
router.patch('/', updateBusiness)

module.exports = router