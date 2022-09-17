const Business = require('../models/business')
const Location = require('../models/location')
const Deal = require('../models/deal')
const authUser = require('../utils/authUser')

exports.create = async (req, res) => {
    const {
        businessName,
        category, 
        address, 
        description, 
        openingTime,
        closingTime,
        webSiteUrl,
        imageUrl,
        imagePath
    } =  req.body

    const user = await authUser(req)

    try {
        const newBusiness = Business.create({
            businessName, 
            category, 
            address, 
            description,
            openingTime, 
            closingTime,
            webSiteUrl,
            imageUrl,
            imagePath,
            owner: user._id
        })
            
        res.send({
            business: newBusiness
        })   
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.getAll = async (req, res) => {
   try {
    const data = await Business.find()
    res.json({
        businesses: data
    })
   } catch (error) {
    res.status(500).json({
        error
    })
   }
}

exports.getById = async (req, res) => {

    const id = req.params.id

    try {
        const business = await Business.findById(id)
        .populate('locations')
        .populate('deals')

        res.json({
            business
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.updateBusiness = async (req, res) => {

    const id = req.params.id
    const payload = req.body

    try {

        const data = await Business.findOneAndUpdate({ _id: id }, payload, {
            new: true
        })

        res.json({
            success: true,
            data
        })

    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.deleteBusiness = async (req, res) => {

    const id = req.params.id

    try {
        const business = await Business.findById(id)

        business.locations.forEach(async location => {
            await Location.deleteOne({_id: location})
        })

        business.deals.forEach(async deal => {
            await Deal.deleteOne({_id: deal})
        })

        const deleted = await Business.deleteOne({_id: id})

        res.json({
            success: true,
            deleted
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

