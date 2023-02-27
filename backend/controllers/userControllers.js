const User = require('../models/user');
const bcrypt = require("bcryptjs");

// register a user
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //validate the entries
        if (!name || !email || !password) {
            throw new Error("All fields are required");
        }

        //check if user already registered
        const userExist = await User.find({ email });
        if (userExist) {
            throw new Error("User already registered")
        }

        //encrypt the password
        const encryptedPasswd = await bcrypt.hash(password, 10);

        //create the user
        const user = await User.create({
            name,
            email,
            password: encryptedPasswd
        });

    } catch (error) {
        console.log(error);
    }
}