const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// register a user
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //validate the entries
        if (!(name && email && password)) {
            throw new Error("All fields are required");
        }

        //check if user already registered
        const userExist = await User.findOne({ email });
        if (userExist) {
            res.status(400).send("User already registered");
        }

        //encrypt the password
        const encryptedPasswd = await bcrypt.hash(password, 10);

        //create the user
        const user = await User.create({
            name,
            email,
            password: encryptedPasswd
        });

        //creating token
        const myToken = jwt.sign(
            { userId: user._id, email },
            process.env.SECRET_KEY,
            {
                expiresIn: "4h"
            }
        )

        //saving token in user-database & restricting password going to frontend
        user.token = myToken;
        user.password = undefined;

        res.status(200).json(user);

    } catch (error) {
        console.log(error);
    }
}

//login a user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validation check
        if (!(email && password)) {
            res.status(400).send("All fields are required")
        }

        //check if registered or not
        const userExists = await User.findOne({ email });
        if (!userExists) {
            res.status(400).send("You are not registered")
        }

        //compare and validate passwords
        const trueUser = await bcrypt.compare(password, userExists.password);
        if (!trueUser) {
            throw new Error("Password does not match")
        }

        //if all good - send token
        if (userExists && trueUser) {
            const myToken = jwt.sign(
                { userId: userExists._id, email },
                process.env.SECRET_KEY,
                {
                    expiresIn: '2h'
                }
            )

            userExists.token = myToken;
            userExists.password = undefined;

            // res.status(200).json(userExists);

            //Setting cookies - send token in cookies
            const options = {
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };

            res.status(200).cookie('token', myToken, options).json({
                success: true,
                myToken,
                userExists
            })
        }

    } catch (error) {
        console.log(error);
    }
}

//dashboard
exports.dashboard = async (req, res) => {
    res.send("Welcome to secret dashboard");
}

