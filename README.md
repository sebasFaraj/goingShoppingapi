# Introduction

* To better understand full-stack development, I'm making a clone of the Urban Outfitters online shop.
* I'm aiming at copying the front-end as closely as possible and to create an API that can support basic functionality such as making an order and logging in.
* This repository hosts the API I've built for this project and was made using MongoDB, Express, and NodeJs

# Usage

* The API supports three routes: user, products, and orders.
* Trying to access it from any other route will just respond with a 404 error

# Products

* Get/Get by Id:
    * Accesing the product GET routes simply returns an array of all the available products alongside some information about them
    * Accesing the product GET route with a product ID returns information specific to that product
* Post:
    * Post handles the addition of new products into the database
    * The body of the request must have a name, price, category, and availability property else the request fails. 
    * Name:String, Price:Number, Category:String, Availability:Boolean
* Delete:
    * Accesing this route requires using the productId of a product to delete it.
* Patch: 
    * To access this route, the request body must be in the form of an array of objects each with two properties: fieldName and newValue.
    * As their names suggest, fieldName must have the value of the field that needs to be chagned while newValue must have a value of the appropriate type.
    * This implementation allows for the dynamic updating of a product

# Orders

* Get/Get by Id:
    * Accesing the orders GET routes retrieves an array of all orders currently in the database
    * Accessing the orders GET routes while providing an orderId returns information regarding that specific order
* Post: 
    * Post handles the addition of a new order into the database
    * The url must contain a productID, while the body must contain the quantity of the product and a user token
    * product:mongooseId, quantity:Number, date:Date, user:mongooseId
* Delete:
    * Accesing this route while providing an orderID removes the order from the database

# Users

* /signup
    * Handles user sign up, body must contain a valid email and a plaintext password that will be hashed
* /login
    * Body must contain an email and password and returns a token that is then used for authorization

