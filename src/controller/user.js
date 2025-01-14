const { findOrCreateMobileUser } = require('../services/user.service')
const Business = require('./../models/business')
const Deal = require('./../models/deal')
const MobileUser = require('./../models/mobile_user')
const Setting = require('./../models/setting')

const authMobileUser = require('./../utils/authMobileUser')

exports.me = async (req, res) => {
    try {
        const firebaseUser = req.user

        const user = await findOrCreateMobileUser(firebaseUser.uid, {
            name: firebaseUser.name,
            email: firebaseUser.email,
            photo_url: firebaseUser.picture
        })
        res.json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}

exports.getAllBusiness = async (req, res) => {
    try {
        const business = await Business.find()
        .populate('deals')
        .populate('locations')

        res.json({business})
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.getAllDeals = async (req, res) => {
    try {
        const deals = await Deal.find()
        .populate('businessId')
        .populate('locations')

        res.json({deals})
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.getBusiness = async (req, res) => {

    const {id} = req.params

    try {
        const business = await Business.findById(id)
        .populate('deals')
        .populate('locations')

        res.json({business})
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}


exports.getDeal = async (req, res) => {

    const {id} = req.params

    try {
        
        const deal = await Deal.findById(id)
        .populate('businessId')
        .populate('locations')

        res.json({deal})

    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.getDealOfTheDay = async (req, res) => {

    try {
        
        const setting = await Setting.findOne({})

        res.json({
            deal: setting.dealOfTheDay
        })

    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.favoriteBusiness = async (req, res) => {

    const {id} = req.params

    try {

        const authUser = await authMobileUser(req)

        await MobileUser.updateOne(
            {_id: authUser._id},
            {$push: {favouriteBusiness: id}}
        )

        const user = await MobileUser.findById(authUser._id)

        res.json({
            success: true,
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}


exports.removeFavoriteBusiness = async (req, res) => {

    const {id} = req.params

    try {

        const authUser = await authMobileUser(req)

        await MobileUser.updateOne(
            {_id: authUser._id},
            {$pull: {favouriteBusiness: id}}
        )

        const user = await MobileUser.findById(authUser._id)

        res.json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            error
        })
    }
}


exports.saveDeal = async (req, res) => {

    const {id} = req.params

    try {

        const authUser = await authMobileUser(req)

        await MobileUser.updateOne(
            {_id: authUser._id},
            {$push: {savedDeals: id}}
        )

        const user = await MobileUser.findById(authUser._id)

        res.json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

exports.removeSaveDeal = async (req, res) => {

    const {id} = req.params

    try {

        const authUser = await authMobileUser(req)

        await MobileUser.updateOne(
            {_id: authUser._id},
            {$pull: {savedDeals: id}}
        )

        const user = await MobileUser.findById(authUser._id)

        res.json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            error
        })
    }
}