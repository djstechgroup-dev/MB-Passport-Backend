const authUser = require('./../utils/authUser')

exports.isAdmin = async (req, res, next) => {
    try {
        const user = await authUser(req)

        const role = user.role

        if(role !== 0) throw new Error('You are not allowed to access this endpoint')

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            error: error.message
        })
    }
}