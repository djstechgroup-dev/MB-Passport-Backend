const User = require('./../models/user')

exports.createUser = async payload => {
    
}

exports.findOrCreate = async (uid, payload) => {

    try {
        const existUser = await User.findOne({user_id: uid})

        if(!existUser) {
            const newUser = new User({
                ...payload,
                user_id: uid,
            })

            let user = await newUser.save()

            return user
        }

        return existUser
    } catch (error) {
        throw error
    }

}