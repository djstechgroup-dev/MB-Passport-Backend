const Location = require('../models/location')
const Business = require('../models/business')

exports.addLocation = async (req, res) => {

    const {
        businessId
    } =  req.body

    try {

        const location = await Location.create(req.body)
        
        const business = await Business.findById(businessId)

        if(business) {
            business.locations.push(location._id)
            await business.save()
        }

        res.send({
            success: true,
            location,
            business
        })   

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }

}

exports.getAllLocations = async (req, res) => {
   try {
    const locations = await Location.find()
    res.json({
        locations
    })
   } catch (error) {
    res.status(500).json({
        error
    })
   }
}

exports.getLocationById = async (req, res) => {

    const id = req.params.id

    try {
        const location = await Location.findById(id)

        res.json({
            location
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.getLocationByBusiness = async (req, res) => {

    const id = req.params.id

    try {
        const locations = await Location.find({businessId: id})

        res.json({
            locations
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.updateLocation = async (req, res) => {

    const id = req.params.id
    const payload = req.body

    try {
        const location = await Location.updateOne({ _id: id }, { $set: payload })

        res.json({
            success: true,
            location
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.deleteLocation = async (req, res) => {

    const id = req.params.id

    try {

        const location = await Location.findById(id)

        await Business.updateOne(
            {_id: location.businessId},
            {$pull: {locations: location._id}}
        )
        const deleted = await Location.deleteOne({_id: id})

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
