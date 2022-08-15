const jwt = require('jsonwebtoken')

exports.signAccessToken = function(payload) {
    try {
        return jwt.sign(payload, 'secret', {
            expiresIn: '15m'
        })
    } catch (error) {
        throw error
    }
}

exports.signRefreshToken = function(payload) {
    try {
        return jwt.sign(payload, 'secret', {
            expiresIn: '7d'
        })
    } catch (error) {
        throw error
    }
}

exports.verifyAccessToken = function(token) {
    try {
        return jwt.verify(token, 'secret')
    } catch (error) {
        throw error
    }
}

exports.verifyRefreshToken = function(token) {
    try {
        return jwt.verify(token, 'secret')
    } catch (error) {
        throw error
    }
}