const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Get all orders from a user
router.get('/', (req, res, next) => {
    res.status(200).json({message: "this is the get request to fetch all order"});
});

//Get one order from a user
router.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    res.status(200).json({message: "this is the get request to get a specific order"});
});

router.post('/', (req, res, next) => {
    res.status(200).json({message: "this is the post request for orders"})
})

//Change an order from a user
router.patch('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    res.status(200).json({message: "this is the request to change a specific order"});
});

//Delete an order from a user
router.delete('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    res.status(200).json({message: "this is the request to delete a specific order"});
});

module.exports = router;