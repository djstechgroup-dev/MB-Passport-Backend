const jwt = require('jsonwebtoken')

const secretAccessKey = process.env.JWT_ACCESS_KEY || 'secretaccesskey'
const secretRefreshKey = process.env.JWT_REFRESH_KEY || 'secretrefreshkey'

exports.signAccessToken = function(payload) {
    try {
        return jwt.sign(payload, secretAccessKey, {
            expiresIn: '1m'
        })
    } catch (error) {
        throw error
    }
}

exports.signRefreshToken = function(payload) {
    try {
        return jwt.sign(payload, secretRefreshKey, {
            expiresIn: '7d'
        })
    } catch (error) {
        throw error
    }
}

exports.verifyAccessToken = function(token) {
    try {
        return jwt.verify(token, secretAccessKey)
    } catch (error) {
        throw error
    }
}

exports.verifyRefreshToken = function(token) {
    try {
        return jwt.verify(token, secretRefreshKey)
    } catch (error) {
        throw error
    }
}