const Business = require("../models/business")
const Deal = require('../models/deal')
const authUser = require("../utils/authUser")

exports.myBusiness = async (req, res) => {
   try {
        const user = await authUser(req)
        const business = await Business.find({owner: user._id})
        .populate('locations')
        .populate('deals')
        
        res.json({
            business
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.myDeals = async (req, res) => {
    try {
         const user = await authUser(req)
         const deals = await Deal.find({user: user._id})
         .populate('locations')
         .populate('businessId')
         .populate('user')

         res.json({
             deals
         })
     } catch (error) {
         res.status(500).json({
             error
         })
     }
 }


exports.myBusinessById = async (req, res) => {
    try {
        const user = await authUser(req)
        const business = await Business.find({owner: user._id})
        res.json({
            business
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
 }