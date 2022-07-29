const User = require('../models/user')
const MobileUser = require('../models/mobile_user')
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {
    console.log("BODY",req.body)
    User.findOne({email: req.body.email}).exec((err, user) => {
        if (user) {
            return res.status(400).send({
                error: 'Email is taken'
            })
        }

        const {firstName, lastName, businessName, contact, email, password} =  req.body

        let newUser = new User({firstName, lastName, businessName, contact, email, password})
        newUser.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            console.log(success)
            const token = jwt.sign({ _id: success._id }, process.env.JWT_SECRET);
            res.send({
                message: success,
                jwt: token
            })
        })
    })
}

exports.signupMobile = (req, res) => {
    console.log("BODY",req.body)
    MobileUser.findOne({email: req.body.email}).exec((err, user) => {
        if (user) {
            return res.status(400).send({
                error: 'Email is taken'
            })
        }

        const {name, email, password} =  req.body

        let newUser = new MobileUser({name, email, password})
        newUser.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            console.log(success)
            const token = jwt.sign({ _id: success._id }, process.env.JWT_SECRET);
            res.send({
                message: success,
                jwt: token
            })
        })
    })
}

exports.signin = (req, res) => {
    // console.log(req.body)
    User.findOne({email: req.body.email}).exec((err, user)=>{
        if(err || !user) {
            return res.status(400).json({
                error: "User doesnot Exist"
            })
        }
        if(!user.authenticate(req.body.password)){        
            return res.status(400).json({
                error: "Password doesn't Match"
        })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        res.cookie('token', token, { expiresIn: '1d' });
        const { _id, name, email, role, contact} = user;
        return res.json({
            token,
            user: { _id, name, email, role, contact}
        });
    })
}

exports.signinMobile = (req, res) => {
    // console.log(req.body)
    MobileUser.findOne({email: req.body.email}).exec((err, user)=>{
        if(err || !user) {
            return res.status(400).json({
                error: "User doesnot Exist"
            })
        }
        if(user.password !== req.body.password){        
            return res.status(400).json({
                error: "Password doesn't Match"
        })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        res.cookie('token', token, { expiresIn: '1d' });
        const { _id, name, email, favouriteBusiness, offerRedeemed, savedDeals, savingsEarned} = user;
        return res.json({
            token,
            user: { _id, name, email, favouriteBusiness, offerRedeemed, savedDeals, savingsEarned}
        });
    })
}