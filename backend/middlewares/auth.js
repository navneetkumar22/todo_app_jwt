const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = (req, res, next) => {
    const token = req.cookies.token;

    //check if token is present
    if (!token) {
        return res.status(403).send("Token is missing")
    }

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.User = decode;
        console.log(decode);

    } catch (error) {
        res.status(401).send("Invalid token")
    }

    return next();
}

module.exports = auth;