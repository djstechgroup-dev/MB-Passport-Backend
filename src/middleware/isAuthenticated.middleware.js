const {  verifyAccessToken } = require('../services/jwt.service')
const User = require('./../models/user')

const authenticated = async (req, res, next) => {
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

module.exports = authenticated