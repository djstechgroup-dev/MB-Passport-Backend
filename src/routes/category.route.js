const express = require('express')
const router = express.Router()
//const {firebaseAuth} = require('./../middleware/isAuthenticated.middleware')

const {
    getCategories,
    getCategory
} = require("../controller/category")

//router.use(firebaseAuth)

router.get('/', getCategories)
router.get('/:id', getCategory)

module.exports = router