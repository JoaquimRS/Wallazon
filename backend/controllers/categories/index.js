const categoryController = require("./categories.controller")

exports.getCategories = async (req,res) => {
    let categories
    try {
        categories = await categoryController.findAll()
    } catch (error) {
        categories = error
    }
    res.json(categories)
} 

exports.getCategory = async (req,res) => {
    let category
    try {
        category = await categoryController.findOne(req.params.idCategory,req.auth)
    } catch (error) {
        category = error
    }
    res.json(category)
} 

exports.addCategory = async (req,res) => {
    let category
    try {
        category = await categoryController.addOne(req.body)
        
    } catch (error) {
        category = error
    }
    res.json(category)
} 

exports.deleteCategory = async (req,res) => {
    let category
    try {
        category = await categoryController.deleteOne(req.params.idCategory)
    } catch (error) {
        category = error
    }
    res.json(category)
} 

exports.updateCategory = async (req,res) => {
    let category
    try {
        category = await categoryController.updateOne(req.params.idCategory, req.body)
    } catch (error) {
        category = error
    }
    res.json(category)
} 