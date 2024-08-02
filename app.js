const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config({path: './.env'});

//Importing routes
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

//Connect to MongoDB
mongoose.connect('mongodb+srv://sebasFaraj:' + process.env.MONGO_ATLAS_PW + '@shopcluster.vsctqik.mongodb.net/?retryWrites=true&w=majority&appName=shopCluster')

//Start logging
app.use(morgan('dev'));


//Body parser is a module that facilitates handling json data in the request
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//This response provides the headers we need to prevent CORS errors and then say what HTTP methods supported in the API
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');


    if (req.method === 'OPTIONS')
    {
        req.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }


    next();
})

//Routes that handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


//Error Handling

//If a user is trying to access a route that doesn't exist, then this is thrown
app.use((req, res, next) => {
    const error = new Error('The page you are trying to reach does not exist'); //Error object is default from Node
    error.status = 404;
    next(error); //This will forward the error request to the next set of app.use
});

//This is activated if any error is thrown
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;