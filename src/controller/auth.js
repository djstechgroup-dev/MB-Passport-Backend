const bcrypt = require('bcryptjs')
const {getAuth} = require('firebase-admin/auth')
const User = require('./../models/user')
const admin = require('./../services/firebase.service')

exports.signup = async (req, res) => {

    try {

        const {
            firstname,
            lastname,
            email,
            password,
            business_name
        } = req.body
    
        const name = `${firstname} ${lastname}`
        const hash = bcrypt.hashSync(password,10)

        const firebaseResponse = await admin.auth().createUser({
            email,
            password,
            emailVerified: false,
            disabled: false,
            displayName: name
        })

        let role = null

        //find the user in mongodb
        const user = await User.findOne({user_id: firebaseResponse.uid})

        //if user not exist
        //create user in mongodb
        if(!user) {
            const newUser = await User.create({
                user_id: firebaseResponse.uid,
                email,
                password: hash,
                name,
                businessName: business_name,
            })

            role = newUser.role

        } else {
            role = user.role
        }

        
        await admin.auth().setCustomUserClaims(firebaseResponse.uid, {role})

        const token = await getAuth().createCustomToken(firebaseResponse.uid)

        res.json({
            ...firebaseResponse,
            token,
            role
        })

    } catch (error) {
        res.send(error)
    }

}

exports.signin = async (req, res) => {

    const {email, password} = req.body

    try {
        const user = await User.findOne({email})

        if(!user) throw new Error('User not found')

        const match = bcrypt.compareSync(password, user.password)

        if(!match) throw new Error('Incorrect password')

        const token = await getAuth().createCustomToken(user.uid)

        res.json({
            token
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