const express = require('express');
const mongoose = require('mongoose');
const {mongodb,foodSchema,catSchema} = require('./db');
const createuser = require('./Routes/createUser');
const loginuser = require('./Routes/loginUser');
const orderdata = require('./Routes/order_data');
var cors = require('cors')
const app = express();

// Allowing inter port communication
app.use(cors());


//Connecting to DB
mongodb();

// Initiliazing food DB model
const foodData = mongoose.model('foodData',foodSchema,'foodItems');
const catData = mongoose.model('catData',catSchema,'foodcatagory');
let food,category;

// Connecting to routes
app.use(express.json());
app.use('/user',createuser);
app.use('/user',loginuser);
app.use('/api',orderdata);


app.get('/', async (req,res)=>{
    try{
        food = await foodData.find({});
        category = await catData.find({});
        res.status(200).json(food);
    }catch(err){
        res.status(500).json({"Error retrieving data":err});
    }
});

// Displaying Food Data
app.post('/food',async (req,res)=>{
    try {
        food = await foodData.find({});
        category = await catData.find({});
        const responseObj = {food,category}
        res.status(200).send(responseObj);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

app.listen(process.env.PORT || 5000,console.log('Listening on 5000'));