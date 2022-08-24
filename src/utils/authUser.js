const User = require('./../models/user')

const authUser = async req => {

    try {
        const user = await User.findOne({
            user_id: req.user.uid,
            email: req.user.email
        })

        if(!user ) throw new Error('Unauthorize')
        
        return user
    } catch (error) {
        throw error
    }

}

module.exports = authUser