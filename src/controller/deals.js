const Deal = require('../models/deal')

exports.create = async (req, res) => {

    const {
    business_id,
    tagline,
    locations,
    active_from,
    active_to,
    no_offers,
    est_saving,
    kpi,
    PhotoURL
    } =  req.body

        try {
            const deal = new Deal({
                business_id,
                tagline,
                locations,
                active_from,
                active_to,
                no_offers,
                est_saving,
                kpi,
                PhotoURL
            })
            
            await deal.save()
            
            res.send({
                data: deal
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
