const {getAuth} = require('firebase-admin/auth')

exports.firebaseAuth = async (req, res, next) => {

    try {

        const authorization = req.headers.authorization

        if(!authorization) throw new Error('Unauthorized')

        const token = authorization.split(' ')[1]

        const decoded = await getAuth().verifyIdToken(token)

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