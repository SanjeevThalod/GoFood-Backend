const express = require('express');
const User = require('../Schema/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const genToken = require('../authenticate/jwt');
const router = express.Router();


router.post('/create', [body('name', 'Min 5 characters').isLength({ min: 5 }), body('password', 'Short Password').isLength({ min: 5 }), body('email', 'Enter Valid email').isEmail()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        const newUser = await User.create({
            name: req.body.name,
            password: secPass,
            location: req.body.location,
            email: req.body.email
        });
        const tokenPayload = {
            user: {
                id: newUser._id // You can use the user's unique ID here
            }
        };
        const authToken = genToken(tokenPayload);
        res.status(200).json({ success: true,authToken:authToken,username:newUser.name });
    } catch (error) {
        res.status(500).json({ 'Could\'t create account': error.message });
    }
});

module.exports = router;