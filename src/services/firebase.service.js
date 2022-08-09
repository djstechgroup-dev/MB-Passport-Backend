const admin = require('firebase-admin')
const credentials = require('./../firebase/firebase-adminsdk.json')

admin.initializeApp({
    credential: admin.credential.cert(credentials)
})

module.exports = admin