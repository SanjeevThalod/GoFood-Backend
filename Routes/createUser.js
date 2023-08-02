const express = require('express');
const mongoose = require('mongoose');
const userSchema = require('../User');
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Creating Model for user data
const User = mongoose.model('User',userSchema);

router.post('/create',[body('name','Min 5 characters').isLength({min:5}),body('password','Short Password').isLength({min:5}),body('email','Enter Valid email').isEmail()],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(500).json({errors:errors.array()});
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        await User.create({
            name: req.body.name,
            password: secPass,
            location: req.body.location,
            email: req.body.email
        });
        res.status(200).json({success:true});
    } catch (error) {
        res.status(500).json({'Could\'t create account':error.message});
    }
});

module.exports = router;