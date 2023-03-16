const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    const token = req.cookies.token;

    //check if token is present
    if (!token) {
        return res.status(403).send("Token is missing")
    }

    try {
        const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);
        req.User = await User.findById(verifiedUser._id, "name email")

        console.log(verifiedUser);

    } catch (error) {
        res.status(401).send("Invalid token - not authorized to access this route")
    }

    return next();
}

module.exports = auth;