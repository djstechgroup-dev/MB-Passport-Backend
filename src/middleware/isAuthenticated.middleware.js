const {getAuth} = require('firebase-admin/auth')
const { verifyRefreshToken } = require('../services/jwt.service')
const User = require('./../models/user')

const authenticated = async (req, res, next) => {
    try {
        const {mbrtoken} = req.cookies

        if(!mbrtoken) throw new Error('Unauthorized')

       const decoded = verifyRefreshToken(mbrtoken)

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

module.exports = authenticated