const mongoose = require('mongoose')

const LocationSchema = mongoose.Schema({

    businessId: {
        type: mongoose.Types.ObjectId,
        ref: 'Business'
    },
    name: String,
    address: String,
    info: String,
    openingTime: {
        type: Object,
        default: () => ({
            hours: new Date().getHours(),
            minutes: new Date().getMinutes(),
            seconds: new Date().getSeconds()
        })
    },
    closingTime: {
        type: Object,
        default: () => ({
            hours: new Date().getHours(),
            minutes: new Date().getMinutes(),
            seconds: new Date().getSeconds()
        })
    },
    deals: [{
        type: mongoose.Types.ObjectId,
        ref: 'Deal'
    }],
    placeholder: String,
    imageUrl: String,
    imagePath: String,
    useBusinessPhoto: Boolean

})

module.exports = mongoose.model('Location', LocationSchema)