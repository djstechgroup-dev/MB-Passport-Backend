const firebase = require('firebase-admin')
const {getAuth} = require('firebase-admin/auth')
const credentials = require('./../firebase/firebase-adminsdk.json')

firebase.initializeApp({
    credential: firebase.credential.cert(credentials)
})

exports.createUser = async payload => {
    try {
        const user = await firebase.auth().createUser({
            email: payload.email,
            password: payload.password,
            displayName: payload.firstname + ' ' + payload.lastname,
            photoURL: `https://www.gravatar.com/avatar?d=mp`,
            emailVerified: false,
            disabled: false,
            phoneNumber: payload.phoneNumber
        })

        return user        
    } catch (error) {
        throw error
    }
}

exports.setCustomData = async (uid, payload) => {
    try {
        return await firebase.auth().setCustomUserClaims(uid, payload)
    } catch (error) {
        throw error
    }
}

exports.createToken = async (uid) => {
    try {
        return  await getAuth().createCustomToken(uid)
    } catch (error) {
        throw error
    }
}

//module.exports = firebase