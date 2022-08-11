const {getAuth} = require('firebase-admin/auth')
const User = require('./../models/user')

const authenticated = async (req, res, next) => {
    try {
        const authorization = req.headers?.authorization

        if(!authorization) throw new Error('Unauthorized')

        const token = authorization.split(' ')[1]

        if(!token) throw new Error('Unauthorized')

        const {user_id} = await getAuth().verifyIdToken(token)

        const user = await User.findOne({user_id})

        if(!user) req.user = null

        if(user) req.user = user

        next()
    } catch (error) {
        res.status(401).json({
            message: error.message,
            status: 401
        })
    }
}

module.exports = authenticated