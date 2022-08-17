const Business = require("../models/business")

exports.myBusiness = async (req, res) => {
   try {

    const user = req.user
    const data = await Business.find({owner: user._id})
    res.json({
        data
    })
   } catch (error) {
    res.status(500).json({
        error
    })
   }
}

