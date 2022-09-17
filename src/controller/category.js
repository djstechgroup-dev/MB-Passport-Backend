
const data = [
    'Automotive',
    'Business Support & Supplies',
    'Computers & Electronics',
    'Construction & Contractors',
    'Education',
    'Entertainment',
    'Food & Dining',
    'Health & Medicine',
    'Home & Garden',
    'Legal & Financial',
    "Manufacturing, Wholesale, Distribution",
    'Merchants (Retail)',
    'Miscellaneous',
    'Personal Care & Services',
    'Real Estate'
]

exports.getCategories = async (req, res) => {

    try {
        const categories = data

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
        const categories = data

        res.json({
            category: categories[id]
        })        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error
        })
    }
}