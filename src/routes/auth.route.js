const express = require('express')
const router = express.Router()

const {signup, signin, signupMobile, signinMobile} = require("../controller/auth")

router.post('/signup', signup)
// router.post('/mobile_signup', signupMobile)
// router.post('/mobile_signin', signinMobile)
router.post('/signin', signin)

module.exports = router