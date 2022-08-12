const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name: String
})

module.exports = mongoose.model('Category', CategorySchema)