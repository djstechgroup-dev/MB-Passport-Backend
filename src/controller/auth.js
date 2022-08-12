const bcrypt = require('bcryptjs')
const {getAuth} = require('firebase-admin/auth')
const User = require('./../models/user')
const {createUser, createToken, setCustomData} = require('./../services/firebase.service')
const {findOrCreate} = require('./../services/user.service')

exports.signup = async (req, res) => {

    try {

        const {
            firstname,
            lastname,
            email,
            password,
            business_name
        } = req.body

        const {uid, displayName, email: fbEmail, photoURL} = await createUser({
            email,
            password,
            name: `${firstname} ${lastname}`
        })

        const user = await findOrCreate(uid, {
            name: displayName,
            email: fbEmail,
            photo_url: photoURL,
            business_name
        })

        // const payload = {
        //     user_id: uid,
        //     email: fbEmail,
        //     role: user.role
        //  }

        // await setCustomData(uid, payload)

        // const token = await createToken(uid, payload)

        res.json({
            //token,
            user
        })

    } catch (error) {
        res.send(error)
    }

}

exports.signin = async (req, res) => {

    const {email} = req.body

    try {
        const {uid, email: fbEmail, displayName, photoURL} = await getAuth().getUserByEmail(email)

        const user = await findOrCreate(uid, {
            name: displayName,
            email: fbEmail,
            photo_url: photoURL
        })

        // const payload = {
        //     user_id: uid,
        //     email: fbEmail,
        //     role: user.role
        //  }

        // const token = await createToken(uid)

        res.json({
            //token,
            user
        })

    } catch (error) {
        console.log(error)
        res.status(402).json({
            error
        })
    }
}

exports.signInMobile = async (req, res) => {

    const {email} = req.body

    try {
        const {uid, email: fbEmail, displayName, photoURL} = await getAuth().getUserByEmail(email)

        const user = await findOrCreate(uid, {
            name: displayName,
            email: fbEmail,
            photo_url: photoURL,
            role: 2
        })

        // const payload = {
        //     user_id: uid,
        //     email: fbEmail,
        //     role: user.role
        //  }

        // const token = await createToken(uid, payload)

        res.json({
            //token,
            user
        })

    } catch (error) {
        console.log(error)
        res.status(402).json({
            error
        })
    }
}

exports.getAuthUser = async (req, res) => {
    try {
        const user = req.user
        res.json({
            user
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}
