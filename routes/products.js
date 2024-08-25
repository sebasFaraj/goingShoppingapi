const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
const checkAuth = require('../middleware/checkAuth');

//Get all products
router.get('/', (req, res, next) => {

    Product.find()
    .select('name price category _id availability newProduct')
    .exec()
    .then(results => {
        console.log(results);

        //Response is formatted in this variable for readability
        const formattedResponse =
        {
            count: results.length,

            products: results.map(result => {
                return {
                    name: result.name,
                    price: result.price,
                    category: result.category,
                    availability: result.availability,
                    newProduct: result.newProduct,
                    _id: result._id,
                    request: {
                        type: "GET",
                        url: `http://localhost:3000/products/${result._id}`
                    }

                };
            })
        };

        res.status(200).json(formattedResponse);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

//Get a specific product
router.get('/:productId', (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId)
    .select("name price category _id availability")
    .exec()
    .then(result => {
        const formattedResult = {
            name: result.name,
            price: result.price,
            category: result.category,
            availability: result.availability,
            newProduct: result.newProduct,
            _id: result._id 
        }
        
        console.log(result);
        res.status(200).json(formattedResult);
    })
})


// -------ADMIN ONLY

//Add a new product
router.post('/',  checkAuth, (req, res, next) => {
    const newProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        availability: req.body.availability,
        newProduct: req.body.newProduct,
    });

    newProduct.save()
    .then(result => {
        console.log(result);

        const formattedResponse = {
            message: "succesfully added product to database via POST request",
            productDetails: {
                name: result.name,
                price: result.price,
                category: result.category,
                availability: result.availability,
                newProduct: result.newProduct,
                _id: result._id,
                request: {
                    type: "GET",
                    url: `http://localhost:3000/products/${result._id}`
                }
            }
        };

        res.status(200).json(formattedResponse);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

//Delete a product
router.delete('/:productID', (req, res, enxt) => {
   
    const id = req.params.productID;

    //This removes any property in our database that has the id specified in the URL
    Product.deleteOne({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    }) 

})

//Edit a product
router.patch('/:productId', (req, res, next) => {

    const productId = req.params.productId; 

    //To dynamically select what fields of a product are going to be edited, the expected request will be different 
    /*
    Ex:

    [
        {fieldName: field, newValue: value},
        {fieldName: field, newValue: value},
    ]
    By doing this, I can create an object that will then be the used to change the product
    */

    let updateFields = {};

    //Expecting an array from the body, dynamically add what is going to be patched in product
    for (let fields of req.body) {
        updateFields[fields.fieldName] = fields.newValue;
    }

    Product.updateOne({_id: productId}, {$set: updateFields})
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


module.exports = router;