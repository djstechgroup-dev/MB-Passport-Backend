const Business = require('../models/business')
const User = require('./../models/user')

exports.create = async (req, res) => {

    const {
        businessName,
        category, 
        address, 
        description, 
        openingTime,
        closingTime,
        webSiteUrl
    } =  req.body

        const {uid} = req.user

        const user = await User.findOne({user_id: uid})

        try {
            const newBusiness = Business.create({
                businessName, 
                category, 
                address, 
                description,
                openingTime, 
                closingTime,
                webSiteUrl,
                owner: user._id
            })
            
            res.send({
                data: newBusiness
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
        data
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

        const data = await Business.updateOne({ _id: id }, { $set: payload })

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

}