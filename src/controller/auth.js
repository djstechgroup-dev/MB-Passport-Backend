const {getAuth} = require('firebase-admin/auth')
const User = require('./../models/user')
const {findOrCreate, findOrCreateMobileUser} = require('./../services/user.service')
const {signAccessToken, verifyRefreshToken} = require('./../services/jwt.service')
const { deleteCookie } = require('../utils/responseCookie')
const authUser = require('../utils/authUser')
const firebase = require('firebase-admin')

exports.signup = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            email,
            password,
            businessName,
            phoneNumber
        } = req.body

        const user = await firebase.auth().createUser({
            email: email,
            password: password,
            displayName: firstname + ' ' + lastname,
            photoURL: `https://www.gravatar.com/avatar?d=mp`,
            emailVerified: false,
            disabled: false,
            phoneNumber: phoneNumber
        })

        const mongoUser = await User.create({
            user_id: user.uid,
            name: user.displayName,
            email: user.email,
            business_name: businessName,
            phone_number: phoneNumber
        })

        res.json({
            mongoUser
        })

    } catch (error) {
        res.send(error)
    }

}

exports.signin = async (req, res) => {

    const {email} = req.user

    try {
        const response = await getAuth().getUserByEmail(email)

        const user = await findOrCreate(response.uid, {
            name: response.displayName,
            email: response.email,
            photo_url: response.photoURL,
            phone_number: response.phoneNumber
        })

        res.json({
            firebase: response,
            user
        })

    } catch (error) {
        res.status(401).json({
            error
        })
    }
}

exports.signInMobile = async (req, res) => {

    const {email} = req.body

    try {
        const response = await getAuth().getUserByEmail(email)

        const user = await findOrCreateMobileUser(response.uid, {
            name: response.displayName,
            email: response.email,
            photo_url: response.photoURL,
            phone: response.phoneNumber
        })

        res.json({
            user
        })

    } catch (error) {
        console.log('error - ', error)
        res.status(401).json({
            error
        })
    }
}

exports.signOut = (req, res) => {
    deleteCookie(res)

    res.json({
        success: true
    })
}

exports.getAuthUser = async (req, res) => {
    try {

        const firebaseUser = req.user

        const user = await findOrCreate(firebaseUser.uid, {
            name: firebaseUser.name,
            email: firebaseUser.email,
            photo_url: firebaseUser.picture
        })

        res.json({
            user
        })
    } catch (error) {
        res.status(401).json({
            error: error.message
        })
    }
}

exports.refreshToken = async (req, res) => {

    const {mbrtoken} = req.cookies

    try {
        if(!mbrtoken) throw new Error

        const decoded = verifyRefreshToken(mbrtoken)

        const user = await User.findOne({user_id: decoded.uid})

        if(!user) throw new Error

        const newToken = signAccessToken({uid: user.user_id})

        res.json({token: newToken})
    } catch (error) {
        console.log(error)
        res.status(401).json({
            error: 'Unauthenticated'
        })
    }
}