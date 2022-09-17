const Deal = require('../models/deal')
const Location = require('../models/location')
const Business = require('../models/business')

exports.create = async (req, res) => {

    const data =  req.body

    try {

        const {date_range, ...rest} = data

        const deal = await Deal.create({
            active_from: date_range[0],
            active_to: date_range[1],
            ...rest
        })

        data.locations.forEach(async (id) => {
            const location = await Location.findById(id)
            location.deals.push(deal._id)
            await location.save()
        })

        const business = await Business.findById(data.businessId)

        if(business) {
            business.deals.push(deal._id)
            await business.save()
        }

        res.send({
            deal
        })   
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.getAll = async (req, res) => {
   try {
    const deals = await Deal.find()
    res.json({
        deals
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
        const deal = await Deal.findById(id)

        res.json({
            deal
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

        const deal = await Deal.findById(id)

        await Location.updateMany(
            {_id: {$in: deal.locations}},
            {$pull: {deals: deal._id}},
            {multiple: true}
        )

        const updatedDeal = await Deal.updateOne({ _id: id }, { $set: payload })

         payload.locations.forEach(async (id) => {
            const location = await Location.findById(id)
            location.deals.push(deal._id)
            await location.save()
        })

        res.json({
            success: true,
            deal: updatedDeal
        })

    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.deleteDeal = async (req, res) => {

    const id = req.params.id

    try {

        const deal = await Deal.findById(id)

        await Location.updateMany(
            {_id: {$in: deal.locations}},
            {$pull: {deals: deal._id}},
            {multiple: true}
        )

        await Deal.deleteOne({_id: id})

        res.json({
            success: true,
            deal
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.getDealsByBusiness = async (req, res) => {

    const id = req.params.id

    try {
        const deals = await Deal.find({businessId: id})

        res.json({
            deals
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.pauseDeal = async (req, res) => {

    const id = req.params.id

    try {
        const deal = await Deal.updateOne({ _id: id }, { $set: {active: false} })

        res.json({
            deal
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.startDeal = async (req, res) => {

    const id = req.params.id

    try {
        const deal = await Deal.updateOne({ _id: id }, { $set: {active: true} })

        res.json({
            deal
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}