const Category = require('./../models/category')
const data = [
    'Attractions',
    'Beach',
    'Events',
    'Family Fun',
    'Fishing',
    'Golf',
    'Lodging',
    'Shopping',
    'Shows',
    'Transportation',
    "Watersport",
    'Wellness',
    'Breakfast',
    'Brewpub',
    'Buffet',
    'Burgers & Wings',
    'Delivery',
    'Family Dining',
    'Fine Dining',
    'Oceanfront',
    'Pizza',
    'Seafood',
    'Sportsbar',
    'Steakhouse',
]

exports.addCategory = async (req, res) => {

    const {category} = req.body

    try {
        const data = await Category.create({name: category})

        res.json({
            data
        })        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}

exports.getCategories = async (req, res) => {

    try {
        const categories = await Category.find({})

        res.json({
            categories
        })        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}

exports.getCategory = async (req, res) => {

    const {id} = req.params

    try { 
        const category = await Category.findById(id)

        res.json({
            category
        })        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}

exports.updateCategory = async (req, res) => {

    const {id} = req.params
    const {category} = req.body

    try { 
        const data = await Category.findOneAndUpdate({ _id: id }, {name: category}, {
            new: true
        })

        res.json({
            success: true,
            data
        })      
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}

exports.deleteCategory = async (req, res) => {

    const {id} = req.params

    try { 
        const data = await Category.deleteOne({_id: id})

        res.json({
            success: true,
            data
        })      
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}