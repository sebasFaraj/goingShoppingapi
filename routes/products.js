const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


//Get all products
router.get('/', (req, res, next) => {
    res.status(200).json({message: "this is the method to get all products"});
});

//Get a specific product
router.get('/:productId', (req, res, next) => {
    const productId = req.params.productId;

    res.status(200).json({message: "this is the method to get a specific product"})
})


// -------ADMIN ONLY

//Add a new product
router.post('/', (req, res, next) => {
    res.status(200).json({message: "this is the method to post a product"});
});

//Delete a product
router.delete('/', (req, res, next) => {
    res.status(200).json({message: "this is the method to delete a product"});
})

//Edit a product
router.patch('/', (req, res, next) => {
    res.status(200).json({message: "this is the method to edit/patch a product"});
})


module.exports = router;