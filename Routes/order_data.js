const express = require('express');
const {orderSchema} = require('../Orders');
const  mongoose  = require('mongoose');
const router = express.Router();


// Creating Order Model
const Order = mongoose.model('Order',orderSchema);

// Post request
router.post('/orderData',async (req,res)=>{
    let data = req.body.order_data;
    await data.splice(0,0,{Order_date:req.body.order_date});
    let eId = await Order.findOne({'email':req.body.email});
    if(eId === null){
        try {
            await Order.create({
                email:req.body.email,
                order_data:[data]
            })
        } catch (error) {
            res.send("Server Error",error.message);
        }
    }else{
        try {
            await Order.findOneAndUpdate({email:req.body.email},
            {$push:{order_data:data}}).then(()=>{
                res.json({success:true});
            })
        } catch (error) {
            res.send("server error",error.message);
        }
    }
})

module.exports = router;