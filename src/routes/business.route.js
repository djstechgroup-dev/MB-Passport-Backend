const express = require('express')
const router = express.Router()
const {firebaseAuth} = require('./../middleware/isAuthenticated.middleware')

const {
    create, 
    getAll, 
    getById, 
    updateBusiness,
    deleteBusiness
} = require("../controller/business")

router.use(firebaseAuth)

router.post('/', create)
router.get('/', getAll)
router.get('/:id', getById)
router.patch('/:id', updateBusiness)
router.delete('/:id', deleteBusiness)

module.exports = router