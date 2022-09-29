require('dotenv').config()
const mongoose = require('mongoose')
const Category = require('./src/models/category')
const User = require('./src/models/user')
const MobileUser = require('./src/models/mobile_user')
const Business = require('./src/models/business')
const Location = require('./src/models/location')
const Deal = require('./src/models/deal')
const Setting = require('./src/models/setting')

const firebase = require('firebase-admin')
const {getAuth} = require('firebase-admin/auth')
const credentials = require('./src/firebase/firebase-adminsdk.json')

firebase.initializeApp({
    credential: firebase.credential.cert(credentials)
})

const mongoString = process.env?.DATABASE_URL || 'mongodb://localhost:27017/local_db'

const categories = [
    {name: 'Attractions'},
    {name: 'Beach'},
    {name: 'Events'},
    {name: 'Family Fun'},
    {name: 'Fishing'},
    {name: 'Golf'},
    {name: 'Lodging'},
    {name: 'Shopping'},
    {name: 'Shows'},
    {name: 'Transportation'},
    {name: 'Watersport'},
    {name: 'Wellness'},
    {name: 'Breakfast'},
    {name: 'Brewpub'},
    {name: 'Buffet'},
    {name: 'Burgers & Wings'},
    {name: 'Delivery'},
    {name: 'Family Dining'},
    {name: 'Fine Dining'},
    {name: 'Oceanfront'},
    {name: 'Pizza'},
    {name: 'Seafood'},
    {name: 'Sportsbar'},
    {name: 'Steakhouse'},
]

const users = [
    {
        name: 'User 1',
        email: 'user1@email.com',
        password: 'password123'
    },
    {
        name: 'User 2',
        email: 'user2@email.com',
        password: 'password123'
    }
]

const createCategories = async () => {
    await Category.insertMany(categories)
}

const createUser = async () => {

    for(const user of users) {
        try {
            const response = await getAuth().getUserByEmail(user.email)
            //create mongodb user
            await User.create({
                user_id: response.uid,
                name: response.displayName,
                email: response.email,
                photo_url: response.photoURL
            })

        } catch (error) {
            
            const {code} = error

            if(code === 'auth/user-not-found') {
                const resFbUser = await firebase.auth().createUser({
                    email: user.email,
                    password: user.password,
                    displayName: user.name,
                    photoURL: `https://www.gravatar.com/avatar?d=mp`,
                    emailVerified: false,
                    disabled: false
                })

                //create mongodb user
                await User.create({
                    user_id: resFbUser.uid,
                    name: resFbUser.displayName,
                    email: resFbUser.email,
                    photo_url: resFbUser.photoURL
                })                    
                
                //create firebase user
            }
        }
    }
}

const createBusiness = async () => {
    try {

        const users = await User.find({})

        const businesses = [
            {
                businessName: 'User 1 Business 1',
                category: 'Entertainment', 
                address: 'Business 1 address', 
                description: 'Business 1 description', 
                webSiteUrl: 'business1.com',
                imageUrl: null,
                imagePath: null,
                owner: users[0]._id
            },
            {
                businessName: 'User 1 Business 2',
                category: 'Entertainment', 
                address: 'Business 2 address', 
                description: 'Business 2 description', 
                webSiteUrl: 'business2.com',
                imageUrl: null,
                imagePath: null,
                owner: users[0]._id
            },
            {
                businessName: 'User 2 Business 1',
                category: 'Entertainment', 
                address: 'Santa Barbara MT 88317', 
                description: 'User 2 Business 1 description', 
                webSiteUrl: 'business22.com',
                imageUrl: null,
                imagePath: null,
                owner: users[1]._id
            },
            {
                businessName: 'User 2 Business 2',
                category: 'Entertainment', 
                address: 'Yorba Linda South Carolina 28423', 
                description: 'User 2 Business 2 description', 
                webSiteUrl: 'businessuser2.com',
                imageUrl: null,
                imagePath: null,
                owner: users[1]._id
            },
        ]

        const businessResults = await Business.insertMany(businesses)

        for(const business of businessResults) {

            const locationData = {
                businessId: business._id,
                name: `Location ${business.businessName}`,
                address: 'Business Location 1',
                info: 'Test Info',
                placeholder: 'Test placeholder',
                imageUrl: null,
                imagePath: null,
                useBusinessPhoto: false
            }

            const location = await Location.create(locationData)

            business.locations.push(location._id)
            await business.save()


            const dealsData = [
                {
                    tagline: '5% OFF',
                    active_from: new Date,
                    active_to: new Date,
                    no_offers: 25,
                    est_saving: 5,
                    kpi: 'kpi#2',
                    imageUrl: null,
                    imagePath: null,
                    user: business.owner,
                    businessId: business._id,
                    locations: [location._id]
                },
                {
                    tagline: '25% OFF',
                    active_from: new Date,
                    active_to: new Date,
                    no_offers: 10,
                    est_saving: 50,
                    kpi: 'kpi#1',
                    imageUrl: null,
                    imagePath: null,
                    user: business.owner,
                    businessId: business._id,
                    locations: [location._id]
                },
                {
                    tagline: 'Buy 1 Take 1',
                    active_from: new Date,
                    active_to: new Date,
                    no_offers: 15,
                    est_saving: 100,
                    kpi: 'kpi#1',
                    imageUrl: null,
                    imagePath: null,
                    user: business.owner,
                    businessId: business._id,
                    locations: [location._id]
                }
            ]

            const deals = await Deal.insertMany(dealsData)

            location.deals = deals.map(d => d._id)

            await location.save()

            business.deals = deals.map(d => d._id)

            await business.save()
        }

    } catch (error) {
        console.log(error)
    }
}

const loadSetting = async () => {
    try {
        const deals = await Deal.find({})

        const setting = Setting.create({
            dealOfTheDay: deals[4]._id
        })
    } catch (error) {
        console.log(error)
    }
}

const runSeeder = async () => {
    //wipe all data
    await Category.deleteMany({})
    await User.deleteMany({})
    await MobileUser.deleteMany({})
    await Business.deleteMany({})
    await Location.deleteMany({})
    await Deal.deleteMany({})
    await Setting.deleteMany({})

    //insert categories
    await createCategories()

    //insert users
    await createUser()

    //insert businesses
    await createBusiness()

    //create setting
    await loadSetting()

}

mongoose.connect(mongoString, { useNewUrlParser: true})
.then(() => {
    console.log('Connected to the database!')
    return runSeeder()
})
.then(async () => {
    await mongoose.connection.close()
    console.log('Success!')
})
.catch(err => {
    console.log(err)
})
