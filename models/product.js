const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    _id:  mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true}, //TODO: Set what the categories are in the future
    availability: {type: Boolean, required: true} //Booleans are set with lowercase
})


module.exports = mongoose.model("Product", productSchema);