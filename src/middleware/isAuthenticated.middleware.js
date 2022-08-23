const {getAuth} = require('firebase-admin/auth')
const {  verifyAccessToken } = require('../services/jwt.service')
const User = require('./../models/user')

exports.isAuthenticated = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization

        if(!authorization) throw new Error('Unauthorized')

        const accessToken = authorization.split(' ')[1]

        const decoded = verifyAccessToken(accessToken)

        const user = await User.findOne({user_id: decoded.uid})

        if(!user) throw new Error('Unauthorized')

        if(user) req.user = user

        next()
    } catch (error) {
        res.status(401).json({
            user: null,
            token: null
        })
    }
}

exports.firebaseAuth = async (req, res, next) => {

    try {

        const authorization = req.headers.authorization

        if(!authorization) throw new Error('Unauthorized')

        const token = authorization.split(' ')[1]

        const decoded = await getAuth().verifyIdToken(token)

        //const user = await User.findOne({user_id: uid, email})

        if(!decoded) throw new Error('Unauthorized')

        req.user = decoded

        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({
            error,
            user: null
        })
    }

}