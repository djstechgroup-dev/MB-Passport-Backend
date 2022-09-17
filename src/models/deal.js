const mongoose = require('mongoose')

const DealSchema = mongoose.Schema({
    tagline: String,
    active_from: Date,
    active_to: Date,
    no_offers: Number,
    used_deals: {
        type: Number,
        default: 0
    },
    est_saving: Number,
    kpi: String,
    imageUrl: String,
    imagePath: String,
    useBusinessImageUrl: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    businessId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Business'
    },
    locations: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Location'
    }]
})



module.exports = mongoose.model('Deal', DealSchema)