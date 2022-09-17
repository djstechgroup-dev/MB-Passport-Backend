const express = require('express')
const router = express.Router()
const {firebaseAuth} = require('./../middleware/isAuthenticated.middleware')

const {
    create, 
    getAll, 
    getById, 
    updateDeal,
    deleteDeal,
    getDealsByBusiness,
    startDeal,
    pauseDeal
} = require("../controller/deals")

router.use(firebaseAuth)

router.post('/', create)
router.get('/', getAll)
router.get('/:id', getById)
router.patch('/:id', updateDeal)
router.patch('/start/:id', startDeal)
router.patch('/pause/:id', pauseDeal)
router.delete('/:id', deleteDeal)
router.get('/b/:id', getDealsByBusiness)

module.exports = router