const User = require('./../models/user')
const MobileUser = require('./../models/mobile_user')

exports.createUser = async payload => {
    
}

exports.findOrCreate = async (uid, payload) => {

    try {
        const existUser = await User.findOne({user_id: uid})

        if(!existUser) {

            const user = await User.create({
                ...payload,
                user_id: uid
            })

            return user
        }

        return existUser
    } catch (error) {
        throw error
    }

}

exports.findOrCreateMobileUser = async (uid, payload) => {

    try {
        const existUser = await MobileUser.findOne({user_id: uid})

        if(!existUser) {

            const user = await MobileUser.create({
                ...payload,
                user_id: uid
            })

            return user
        }

        return existUser
    } catch (error) {
        throw error
    }

}