const MobileUser = require('./../models/mobile_user')

const mobileAuthUser = async req => {

    try {
        const user = await MobileUser.findOne({
            user_id: req.user.uid,
            email: req.user.email
        })

        if(!user ) throw new Error('Unauthorize')
        
        return user
    } catch (error) {
        throw error
    }

}

module.exports = mobileAuthUser