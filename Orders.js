const express = require('express');
const mongoose = require('mongoose');
const app = express();

const OrderSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    order_data:{
        type:Array,
        required:true
    }
});

module.exports = mongoose.model('Order',OrderSchema);