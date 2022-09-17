const Business = require('./../models/business')
const Deal = require('./../models/deal')

exports.getAllDeals = async (req, res) => {
    try {
        const deals = await Deal.find().populate('businessId')
        

        res.json({deals})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}

exports.getAllBusiness = async (req, res) => {
    try {
        const business = await Business.find()
        res.json({business})
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}