const Todo = require('../models/todo');

//home route
exports.home = (req, res) => {
    res.send("<h1>Hello world! This is full stack todo app</h1>")
}