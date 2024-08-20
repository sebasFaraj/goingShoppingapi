const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/checkAuth');

const Order = require('../models/order');
const Product = require('../models/product');

//Get all orders from a user
router.get('/', checkAuth, (req, res, next) => {
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
                    user: result.user,
                    quantity: result.quantity,
                    purchased: result.purchased
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
router.get('/:orderId', checkAuth, (req, res, next) => {
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

router.post('/:productId',  checkAuth, (req, res, next) => {
    const productId = req.params.productId;
    const quantity = req.body.quantity;
    const purchased = req.body.purchased;
    const token = req.body.token;
    const user = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

    Product.findById(productId)
    .exec()
    .then(product => {
        if (!product)
        {
            res.status(404).json({message: "product does not exist"});
        }
        else
        {
            const newOrder = new Order({
                _id: new mongoose.Types.ObjectId(),
                product: productId,
                quantity: quantity,
                date: new Date,
                user: user.userId,
                purchased: purchased
            })
    
            newOrder.save()
            .then(result => {
                console.log(result);
                const formattedResponse = {
                    message: "Order Stored",
                    createdOrder: {
                        _id: result._id,
                        product: result.product,
                        quantity: result.quantity,
                        date: result.date,
                        user: result.user
                    },
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/orders/" + result._id
                    }
                };
    
                res.status(201).json(formattedResponse);
            })
            .catch(err => {
                res.status(500).json({message: err})
            })

        }
    })
    .catch(err => {
        res.status(500).json({message: err})
    })

})


//Delete an order from a user
router.delete('/:orderId',  checkAuth, (req, res, next) => {
    const orderId = req.params.orderId;
    
    Order.deleteOne({_id: orderId})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({message: "Order deleted"});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })



});

router.patch('/:orderId',  checkAuth, (req, res, next) => {
    const orderId = req.params.orderId;

    let updateFields = {};

    for (let fields of req.body) {
        updateFields[fields.fieldName] = fields.newvalue;
    }

    Product.updateOne({_id: orderId}, {$set: updateFields})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;