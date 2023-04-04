require("dotenv").config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];

    //check if token is present
    if (!token) {
        return res.status(403).send("Token is missing")
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(verifiedToken._id, "name email");

        // res.json({ user: verifiedUser });

    } catch (error) {
        res.status(401).send("Invalid token - not authorized to access this route")
    }

    return next();
}

module.exports = auth;