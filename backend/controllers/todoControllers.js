const Todo = require('../models/todo');

/*****************
 * @HOME  Home Pages - todos 
 *****************/
exports.home = (req, res) => {
    res.send("<h1>Hello world! This is full stack todo app</h1>")
}

/*****************
 * @Create_Todo Create a ToDo 
 *****************/
exports.createTodo = async (req, res) => {
    try {
        const { title} = req.body;
        const user = req.user;


        //validate
        if (!title) {
            throw new Error("Title is required")
        }

        const todo = await Todo.create({ title, user });

        res.status(200).json({
            success: true,
            message: "Todo is successfully created",
            todo
        })
    } catch (error) {
        console.log(error);
    }
}
