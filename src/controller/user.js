const Business = require('./../models/business')
const Deal = require('./../models/deal')
const authMobileUser = require('./../utils/authMobileUser')

exports.me = async (req, res) => {
    try {
        const data = await authMobileUser(req)
        res.json({data})
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
        .populate('deals')
        .populate('locations')

        res.json({business})
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.getAllDeals = async (req, res) => {
    try {
        const deals = await Deal.find()
        .populate('businessId')
        .populate('locations')

        res.json({deals})
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.getBusiness = async (req, res) => {

    const {id} = req.params

    try {
        const business = await Business.findById(id)
        .populate('deals')
        .populate('locations')

        res.json({business})
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}


exports.getDeal = async (req, res) => {

    const {id} = req.params

    try {
        
        const deal = await Deal.findById(id)
        .populate('businessId')
        .populate('locations')

        res.json({deal})

    } catch (error) {
        res.status(500).json({
            error
        })
    }
}