const express = require('express');
const Order = require('../Schema/Orders');
const router = express.Router();

// Post request
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date });
    let eId = await Order.findOne({ 'email': req.body.email });
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            })
        } catch (error) {
            res.status(400).send("Server Error", error.message);
        }
    } else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.status(200).json({ success: true });
                })
        } catch (error) {
            res.status(400).send("server error", error.message);
        }
    }
});

router.post('/myorderData', async (req,res)=>{
    try {
        let myData = await Order.findOne({'email':req.body.email});
        res.status(200).json({orderData:myData});
    } catch (error) {
        res.status(404).send('Error: Data not found',error);
    
    }
})

module.exports = router;