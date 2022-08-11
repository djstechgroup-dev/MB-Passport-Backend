const express = require('express')
const router = express.Router()

const {signup, signin, getAuthUser} = require("../controller/auth")
const isAuthenticated = require('./../middleware/isAuthenticated.middleware')

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/user', isAuthenticated, getAuthUser)

module.exports = router