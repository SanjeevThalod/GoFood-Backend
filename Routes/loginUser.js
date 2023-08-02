const express = require('express');
const mongoose = require('mongoose');
const userSchema = require('../User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {body,validationResult} = require('express-validator');

const router = express.Router();

// Creating Model
const User = mongoose.model('User',userSchema);
const jwtToken = "arondom32bitstringauthentication"

// Login Request
router.post('/login',[body('email','Enter Valid email').isEmail(),body('password').isLength({min:5})],async (req,res)=>{
    let userEmail = req.body.email;
    let userPassword = req.body.password;
    try{
        const userData = await User.findOne({email:userEmail})
        if(!userData){
            res.status(404).json({error:"Try logging with correct email"});
        }else{
            const pwdCompare = await bcrypt.compare(userPassword,userData.password)
            if(!pwdCompare){
                res.status(401).json({error:"Invalid Password"});
            }else{
                const data = {
                    user:{
                        id:userData.id
                    }
                }
                let username = userData.name;
                const authToken = jwt.sign(data,jwtToken);
                res.status(200).json({success:true,authToken:authToken,username:username});
            }
        }
    }catch(error){
        res.status(500).json({error:"Server Error"});
    }
});

module.exports = router;