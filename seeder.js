const mongoose = require('mongoose')
const User = require('./src/models/user')
const Business = require('./src/models/business')
const Location = require('./src/models/location')
const Deal = require('./src/models/deal')

const mongoString = process.env?.DATABASE_URL || 'mongodb://localhost:27017/local_db'

mongoose.connect(mongoString, { useNewUrlParser: true }).then(() => {
    console.log('Connected to the database!')
}).catch(err => {
    console.log(err)
})

const users = [
    {
        name: 'User 1',

    }
]


const runSeeder = async () => {
    //wipe all data
    await User.deleteMany({})
    await Business.deleteMany({})
    await Location.deleteMany({})
    await Deal.deleteMany({})

    //insert data
    
}

runSeeder().then(() => {
    mongoose.connection.close()
})