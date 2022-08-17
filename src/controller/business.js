const Business = require('../models/business')

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

        const user = req.user

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