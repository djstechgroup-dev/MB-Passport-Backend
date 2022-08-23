const express = require('express')
const router = express.Router()

const {signup, signin, signInMobile, signOut, getAuthUser, refreshToken} = require("../controller/auth")
const {isAuthenticated, firebaseAuth} = require('./../middleware/isAuthenticated.middleware')

router.post('/signup', signup)
router.post('/signin', firebaseAuth, signin)
router.post('/signin_mobile', firebaseAuth, signInMobile)
router.post('/signout', firebaseAuth, signOut)
router.get('/user', firebaseAuth, getAuthUser)
router.post('/refresh',  refreshToken)

module.exports = router