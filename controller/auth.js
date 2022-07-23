const User = require('../models/user')
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
            res.send({
                message: success
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