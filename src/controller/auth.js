const {getAuth} = require('firebase-admin/auth')
const User = require('./../models/user')
const {createUser, setCustomData} = require('./../services/firebase.service')
const {findOrCreate} = require('./../services/user.service')
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require('./../services/jwt.service')
const { sendCookie, deleteCookie } = require('../utils/responseCookie')

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

        await findOrCreate(uid, {
            name: displayName,
            email: fbEmail,
            photo_url: photoURL,
            business_name
        })

        const accessToken = signAccessToken({uid})
        const refreshToken = signRefreshToken({uid})

        sendCookie(res, refreshToken)

        res.json({
            token: accessToken
        })

    } catch (error) {
        res.send(error)
    }

}

exports.signin = async (req, res) => {

    const {email} = req.body

    try {
        const response = await getAuth().getUserByEmail(email)

        const user = await findOrCreate(response.uid, {
            name: response.displayName,
            email: response.email,
            photo_url: response.photoURL
        })

        //await getAuth().setCustomUserClaims(response.uid, {user_role: user.role})
        // const accessToken = signAccessToken({uid})
        // const refreshToken = signRefreshToken({uid})

        // sendCookie(res, refreshToken)

        res.json({
            firebase: response,
            user
        })

    } catch (error) {
        console.log(error)
        res.status(401).json({
            error
        })
    }
}

exports.signInMobile = async (req, res) => {

    const {email} = req.body

    try {
        const {uid, email: fbEmail, displayName, photoURL} = await getAuth().getUserByEmail(email)

        await findOrCreate(uid, {
            name: displayName,
            email: fbEmail,
            photo_url: photoURL,
            role: 2
        })

        const token = signRefreshToken({uid})

        res.json({
            token
        })

    } catch (error) {
        res.status(402).json({
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
        const user = req.user
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