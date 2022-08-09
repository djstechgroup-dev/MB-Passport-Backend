const {getAuth} = require('firebase-admin/auth')
const admin = require('./../services/firebase.service')

const authenticated = async (req, res, next) => {
    try {
        const authorization = req.headers?.authorization

        if(!authorization) throw new Error('Unauthorized')

        const token = authorization.split(' ')[1]

        if(!token) throw new Error('Unauthorized')

        const decoded = await getAuth().verifyIdToken(token)

        console.log(decoded)

        next()
    } catch (error) {
        res.status(401).json({
            message: error.message,
            status: 401
        })
    }
}

module.exports = authenticated