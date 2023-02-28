const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '') || req.cookies.token;

    //check if token is present
    if (!token) {
        return res.status(403).send("Token is missing")
    }


}