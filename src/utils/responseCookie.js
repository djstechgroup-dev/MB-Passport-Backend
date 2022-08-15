exports.sendCookie = function(res, token) {
    res.cookie('mbrtoken',token, { httpOnly: true })
}