const productModel = require("../model/productModel");

const getProducts = async (req, res) => {
    try {
        const products = await productModel.find()
        return res.status(200).json(products)
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })

    }
}


module.exports = {
    getProducts
}