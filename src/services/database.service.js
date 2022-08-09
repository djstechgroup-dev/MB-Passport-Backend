const mongoose = require('mongoose')
const mongoString = process.env?.DATABASE_URL || 'mongodb://localhost:27017/local_db'


exports.connectDB = async () => {
    try {
        await mongoose.connect(mongoString, { useNewUrlParser: true })
        console.log('Connected to mongodb')
    } catch (error) {
        throw error
    }
}