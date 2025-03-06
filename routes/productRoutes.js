const { getProducts } = require('../controllers/productController')

const productRouter = require('express').Router()


productRouter.get("/get-products", getProducts)


module.exports = productRouter

