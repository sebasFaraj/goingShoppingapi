const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');

//Get all orders from a user
router.get('/', (req, res, next) => {
    Order.find()
    .select("_id product quantity date user")
    .exec()
    .then(results => {
        console.log(results);

        const formattedResponse = {
            count: results.length,
            orders: results.map(result => {
                return{
                    _id: result._id,
                    product: result.product,
                    date: result.date,
                    user: result.user
                }
            })
        };

        res.status(200).json(formattedResponse);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

//Get one order from a user
router.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    
    Order.findById(orderId)
    .select("_id product quantity date user")
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })

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