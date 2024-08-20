const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product"},
    quantity: {type: Number, required: true, default: 1},
    date: {type: Date, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    purchased: {type: Boolean, required: true}
 
});


module.exports = mongoose.model("Order", orderSchema);