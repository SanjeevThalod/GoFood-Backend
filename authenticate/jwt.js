require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtToken = process.env.TOKEN

const genToken = (data)=>{
    return jwt.sign(data,jwtToken);
}

module.exports = genToken;