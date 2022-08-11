const bcrypt = require('bcryptjs')
const {getAuth, signInWithEmailAndPassword} = require('firebase-admin/auth')
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

        const {uid} = await createUser({
            email,
            password,
            name: `${firstname} ${lastname}`
        })

        const user = await findOrCreate(uid, {
            firstname,
            lastname,
            email,
            password,
            business_name
        })

        const payload = {
            role: user.role,
            firstname,
            lastname,
            business_name
         }

        await setCustomData(uid, payload)

        const token = await createToken(uid)

        res.json({
            token,
            data: payload
        })

    } catch (error) {
        res.send(error)
    }

}

exports.signin = async (req, res) => {

    const {email, password} = req.body

    try {
        const firebaseUser = await getAuth().getUserByEmail(email)

        const data = firebaseUser.customClaims;

        const user = await findOrCreate(firebaseUser.uid, {
            firstname: data.firstname,
            lastname: data.lastname,
            email,
            password,
            business_name: data.business_name
        })

        const token = await createToken(firebaseUser.uid)

        res.cookie('session', token, {
            maxAge: 60 * 60 * 24 * 7 * 1000,
            domain: 'http://localhost:8080',
            path: '/',
            httpOnly: true, 
            secure: true
        })

        res.json({
            token,
            data
        })

    } catch (error) {
        console.log(error)
        res.status(402).json({
            error
        })
    }
}

// exports.signupMobile = (req, res) => {
//     console.log("BODY",req.body)
//     MobileUser.findOne({email: req.body.email}).exec((err, user) => {
//         if (user) {
//             return res.status(400).send({
//                 error: 'Email is taken'
//             })
//         }

//         let {name, email, password} =  req.body
//         password = md5(password)
//         let newUser = new MobileUser({name, email, password})
//         newUser.save((err, success) => {
//             if (err) {
//                 return res.status(400).json({
//                     error: err
//                 })
//             }
//             console.log(success)
//             const token = jwt.sign({ _id: success._id }, process.env.JWT_SECRET);
//             res.send({
//                 message: success,
//                 jwt: token
//             })
//         })
//     })
// }

// exports.signinMobile = (req, res) => {
//     // console.log(req.body)
//     MobileUser.findOne({email: req.body.email}).exec((err, user)=>{
//         if(err || !user) {
//             return res.status(400).json({
//                 error: "User doesnot Exist"
//             })
//         }
//         if(user.password !== md5(req.body.password)){        
//             return res.status(400).json({
//                 error: "Password doesn't Match"
//         })
//         }
//         const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

//         res.cookie('token', token, { expiresIn: '1d' });
//         const { _id, name, email, favouriteBusiness, offerRedeemed, savedDeals, savingsEarned} = user;
//         return res.json({
//             token,
//             user: { _id, name, email, favouriteBusiness, offerRedeemed, savedDeals, savingsEarned}
//         });
//     })
// }

// exports.requireSignin = expressJwt({
//     secret: process.env.JWT_SECRET, algorithms: ["HS256"],// req.user
// });