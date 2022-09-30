const {getAuth} = require('firebase-admin/auth')
const User = require('./../models/user')
const {findOrCreate, findOrCreateMobileUser} = require('./../services/user.service')
const {signAccessToken, verifyRefreshToken} = require('./../services/jwt.service')
const { deleteCookie } = require('../utils/responseCookie')
const authUser = require('../utils/authUser')

exports.signup = async (req, res) => {
    try {

        const {
            firstname,
            lastname,
            email,
            password,
            business_name
        } = req.body

        // const response = await createUser({
        //     email,
        //     password,
        //     firstname,
        //     lastname
        // })

        const user = await findOrCreate(response.uid, {
            name: response.displayName,
            email: response.email,
            photo_url: response.photoURL,
            business_name
        })

        res.json({
            firebase: response,
            user
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
            photo_url: response.photoURL
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