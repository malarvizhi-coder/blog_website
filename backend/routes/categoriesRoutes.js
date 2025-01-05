const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel');
const categoryModel = require('../models/categoryModel');

//Get All Categories ----GET
router.get('/', async(req,res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Get single category by ID  ----GET
router.get('/:id', async(req,res) => {
    try {
        const category = await Category.findById(req.params.id);
        if(!category){
            res.status(400).json({message: "Category not found"});
        }
        res.send(category);
    } 
    catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Create a new Category ---- POST
router.post('/', async(req,res)=>{
    const category = new categoryModel({
        name:  req.body.name,
        slug: req.body.slug,
        description: req.body.description,
    })
    try{
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

//Update an existing post ----PUT
router.put('/:id', async(req,res)=>{
    try {
        const category = await categoryModel.findById(req.params.id);
        if(!category){
            return res.status(404).json({message:"Category not found"})
        }
        category.name =  req.body.name || category.name,
        category.slug = req.body.slug || category.slug,
        category.description = req.body.description || category.description,
        category.updatedAt = Date.now();

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } 
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Delete an existing category ----DELETE
router.delete('/:id', async(req,res)=>{
    try {
        const category = await categoryModel.findByIdAndDelete(req.params.id);
        if(!category){
            return res.status(404).json({message:"Post not found"})
        }
        // await Postmodel.deleteOne({_id:post._id})    ----optional way
        await categoryModel.findByIdAndDelete(category._id);
        res.json({message:"Category Deleted"});
    } 
    catch (error) {
        res.status(500).json({message: error.message});
    }
})

module.exports = router;