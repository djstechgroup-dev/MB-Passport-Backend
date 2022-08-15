const express = require('express')
const router = express.Router()

const {signup, signin, signInMobile, getAuthUser, refreshToken} = require("../controller/auth")
const isAuthenticated = require('./../middleware/isAuthenticated.middleware')

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signin_mobile', signInMobile)
router.get('/user', isAuthenticated, getAuthUser)
router.post('/refresh', refreshToken)

module.exports = router