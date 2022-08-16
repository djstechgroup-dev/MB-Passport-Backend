exports.sendCookie = function(res, token) {
    res.cookie('mbrtoken',token, { httpOnly: true })
}

exports.deleteCookie = function(res) {
    res.cookie('mbrtoken', '', {httpOnly: true})
}