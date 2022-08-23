const Business = require("../models/business")
const User = require('./../models/user')

exports.myBusiness = async (req, res) => {
   try {
    const {uid} = req.user
    const user = await User.findOne({user_id: uid})
    const business = await Business.find({owner: user._id}).populate('locations')
    res.json({
        business
    })
   } catch (error) {
    res.status(500).json({
        error
    })
   }
}


exports.myBusinessById = async (req, res) => {
    try {
        const {uid} = req.user
        const user = await User.findOne({user_id: uid})
        const business = await Business.find({owner: user._id})
        res.json({
            business
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
 }