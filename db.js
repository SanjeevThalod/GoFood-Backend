require('dotenv').config();
const {mongoose} = require('mongoose');

const url = process.env.DB_KEY;

// Schema for foodItems data present in DB

const foodSchema = new mongoose.Schema({
    CatagoryName:String,
    name:String,
    img:String,
    options:[
        {
            half:String,
            full:String,
            regular:String,
            medium:String,
            large:String
        }
    ],
    description:String
})

// Schema for foodCatagory data in DB

const catSchema = new mongoose.Schema({
    CatagoryName:String
})

// Connecting to MongoDB 
const mongodb = async ()=>{
    try{
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Mongo Connected');

    }catch(err){
        console.log('Error connecting to Mongo',err);
    }
}

module.exports = {mongodb,foodSchema,catSchema};