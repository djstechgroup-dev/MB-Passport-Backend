const Location = require('../models/location')
const Business = require('../models/business')

exports.addLocation = async (req, res) => {

    const {
        businessId,
        name,
        address,
        info,
        openingTime,
        closingTime,
        placeholder
    } =  req.body

    try {

        const location = await Location.create({
            businessId,
            name,
            address,
            info,
            openingTime,
            closingTime,
            placeholder
        })
        
        const business = await Business.findById(businessId)

        if(business) {
            business.locations.push(location._id)
            await business.save()
        }

        res.send({
            data: location
        })   

    } catch (error) {
        res.status(500).json({
            error
        })
    }

}

exports.getAll = async (req, res) => {
   try {
    const data = await Deal.find()
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
        const data = await Deal.findById(id)

        res.json({
            data
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.updateDeal = async (req, res) => {

    const id = req.params.id
    const payload = req.body

    try {

        const data = await Deal.updateOne({ _id: id }, { $set: payload })

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
