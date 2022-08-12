const Business = require('../models/business')

exports.create = async (req, res) => {

    const {
        businessName, 
        imageuRL, 
        category, 
        address, 
        description, 
        tagline, 
        hourOpen, 
        webSiteURL,
        hourClose, 
        totalOffers, 
        totalUsed} =  req.body

        try {
            const newBusiness = new Business({
                businessName, 
                imageuRL, 
                category, 
                address, 
                description, 
                tagline, 
                hourOpen, 
                webSiteURL,
                hourClose, 
                totalOffers, 
                totalUsed
            })
            
            await newBusiness.save()
            
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
        const data = await Business.findById(id)

        res.json({
            data
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