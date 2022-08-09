const Business = require('../models/business')
const jwt = require('jsonwebtoken');

exports.createBusiness = (req, res) => {
    const {businessName, 
        imageuRL, 
        category, 
        address, 
        description, 
        tagline, 
        hourOpen, 
        webSiteURL,
        hourClose, 
        totalOffers, 
        totalUsed} =  req.body

        let newBusiness = new Business({businessName, 
            imageuRL, 
            category, 
            address, 
            description, 
            tagline, 
            hourOpen, 
            webSiteURL,
            hourClose, 
            totalOffers, 
            totalUsed})
        
        newBusiness.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            console.log(success)
            res.send({
                message: success
            })
        })

}

exports.getBusiness = (req, res) => {
    // Business.find({}).exec((err, data) => {
    //     if (err) {
    //         return res.status(400).json({
    //             error: errorHandler(err)
    //         });
    //     }
    //     res.json(data);
    // });

    res.json({
        data: [],
        status: 200
    })
}