const express = require('express');
const router = express.Router();

const Postmodel = require('../models/postModel');

//Get all posts ---- GET
router.get('/', async(req,res)=>{
    try {
        const posts = await Postmodel.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//Get a single Post by using ID ---- GET
router.get('/:id', async(req,res)=>{
    try {
        const post = await Postmodel.findById(req.params.id);
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//Create a new Post ---- POST
router.post('/', async(req,res)=>{
    const post = new Postmodel({
        title:  req.body.title,
        content: req.body.content,
        category: req.body.category,
        author: req.body.author,
        image: req.body.image,
    })
    try{
        const newPost = await post.save();
        res.status(201).json(newPost);
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

//Update an existing post ----PUT
router.put('/:id', async(req,res)=>{
    try {
        const post = await Postmodel.findById(req.params.id);
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        post.category = req.body.category || post.category;
        post.author = req.body.author || post.author;
        post.image = req.body.image || post.image;
        post.updatedAt = Date.now();

        const updatedPost = await post.save();
        res.json(updatedPost);
    } 
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Delete an existing post ----DELETE
router.delete('/:id', async(req,res)=>{
    try {
        const post = await Postmodel.findByIdAndDelete(req.params.id);
        if(!post){
            return res.status(404).json({message:"Post not found"})
        }
        // await Postmodel.deleteOne({_id:post._id})    ----optional way
        Postmodel.findByIdAndDelete(post._id);
        res.json({message:"Post Deleted"});
    } 
    catch (error) {
        res.status(500).json({message: error.message});
    }
})

module.exports = router;