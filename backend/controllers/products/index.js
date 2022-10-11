const productController = require("./products.controller")

exports.getProducts = async (req,res) => {
    let products
    try {
        products = await productController.findAll()
    } catch (error) {
        products = error
    }
    res.json(products)
} 

exports.getSkipedProducts = async (req,res) => {
    let products
    try {
        products = await productController.findSkiped(req.params.skip)
    } catch (error) {
        products = error
    }
    res.json(products)
} 

exports.getProduct = async (req,res) => {
    let product
    try {
        product = await productController.findOne(req.params.idProduct)
    } catch (error) {
        product = error
    }
    res.json(product)
} 

exports.addProduct = async (req,res) => {
    let product
    try {
        product = await productController.addOne(req.body)
        
    } catch (error) {
        product = error
    }
    res.json(product)
} 

exports.deleteProduct = async (req,res) => {
    let product
    try {
        product = await productController.deleteOne(req.params.idProduct)
    } catch (error) {
        product = error
    }
    res.json(product)
} 

exports.updateProduct = async (req,res) => {
    let product
    try {
        product = await productController.updateOne(req.params.idProduct, req.body)
    } catch (error) {
        product = error
    }
    res.json(product)
} 