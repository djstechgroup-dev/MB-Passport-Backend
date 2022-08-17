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
            minutes: new Date().getMinutes()
        })
    },
    closingTime: {
        type: Object,
        default: () => ({
            hours: new Date().getHours(),
            minutes: new Date().getMinutes()
        })
    }
    ,
    placeholder: String,
    imageUrl: {
        type: String,
        default: 'http://localhost'
    },
    useBusinessPhoto: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('Location', LocationSchema)