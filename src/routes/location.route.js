const express = require('express')
const router = express.Router()
const {firebaseAuth} = require('./../middleware/isAuthenticated.middleware')

const {
    addLocation,
    getAllLocations,
    getLocationById,
    updateLocation,
    deleteLocation,
    getLocationByBusiness
} = require("../controller/locations")

router.use(firebaseAuth)

router.post('/', addLocation)
router.get('/', getAllLocations)
router.get('/:id', getLocationById)
router.patch('/:id', updateLocation)
router.delete('/:id', deleteLocation)

router.get('/b/:id', getLocationByBusiness)

module.exports = router