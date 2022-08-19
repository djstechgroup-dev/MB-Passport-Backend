const Business = require("../models/business")

exports.myBusiness = async (req, res) => {
   try {
    const user = req.user
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
     const user = req.user
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