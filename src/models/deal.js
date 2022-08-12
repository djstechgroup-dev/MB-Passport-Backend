const mongoose = require('mongoose')

const DealSchema = mongoose.Schema({
    business_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'business'
    },
    tagline: String,
    locations: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'locations'
    },
    active_from: Date,
    active_to: Date,
    no_offers: Number,
    est_saving: Number,
    kpi: [String],
    PhotoURL: String
})

module.exports = mongoose.model('Deal', DealSchema)