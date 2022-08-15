const {getAuth} = require('firebase-admin/auth')
const User = require('./../models/user')
const {createUser} = require('./../services/firebase.service')
const {findOrCreate} = require('./../services/user.service')
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('./../services/jwt.service')
const { sendCookie } = require('../utils/responseCookie')

exports.signup = async (req, res) => {

    try {

        const {
            firstname,
            lastname,
            email,
            password,
            business_name
        } = req.body

        const {uid, displayName, email: fbEmail, photoURL} = await createUser({
            email,
            password,
            name: `${firstname} ${lastname}`
        })

        const user = await findOrCreate(uid, {
            name: displayName,
            email: fbEmail,
            photo_url: photoURL,
            business_name
        })

        const accessToken = signAccessToken({uid})
        const refreshToken = signRefreshToken({uid})

        sendCookie(res, refreshToken)

        res.json({
            token: accessToken,
            user
        })

    } catch (error) {
        res.send(error)
    }

}

exports.signin = async (req, res) => {

    const {email} = req.body

    console.log(req.body)

    try {
        const {uid, email: fbEmail, displayName, photoURL} = await getAuth().getUserByEmail(email)

        const user = await findOrCreate(uid, {
            name: displayName,
            email: fbEmail,
            photo_url: photoURL
        })

        const accessToken = signAccessToken({uid})
        const refreshToken = signRefreshToken({uid})

        sendCookie(res, refreshToken)

        res.json({
            token: accessToken,
            user
        })

    } catch (error) {
        console.log(error)
        res.status(402).json({
            error
        })
    }
}

exports.signInMobile = async (req, res) => {

    const {email} = req.body

    try {
        const {uid, email: fbEmail, displayName, photoURL} = await getAuth().getUserByEmail(email)

        const user = await findOrCreate(uid, {
            name: displayName,
            email: fbEmail,
            photo_url: photoURL,
            role: 2
        })

        const token = signRefreshToken({uid})

        res.json({
            token,
            user
        })

    } catch (error) {
        console.log(error)
        res.status(402).json({
            error
        })
    }
}

exports.getAuthUser = async (req, res) => {
    try {
        const user = req.user
        const token = signAccessToken({uid: user.user_id})
        res.json({
            token,
            user
        })
    } catch (error) {
        res.status(401).json({
            error: error.message
        })
    }
}

exports.refreshToken = (req, res) => {

    const {mbrtoken} = req.cookies

    try {
        if(!mbrtoken) throw new Error

        const decoded = verifyRefreshToken(mbrtoken)

        const user = User.findOne({user_id: decoded.uid})

        if(!user) throw new Error

        const newToken = signAccessToken({uid: user.user_id})

        console.log(newToken)

        res.json({token: newToken})
    } catch (error) {
        console.log(error)
        res.status(401).json({
            error: 'Unauthenticated'
        })
    }
}