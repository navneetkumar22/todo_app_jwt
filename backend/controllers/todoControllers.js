const Todo = require('../models/todo');

/*****************
 * @HOME  Home Page - todos 
 *****************/
exports.home = (req, res) => {
    res.send("<h1>Hello world! This is full stack todo app</h1>")
}

/******************************************
 * @TODO_CONTROLLERS
 * @Create_A_Todo
 * @Get_All_Todos
 * @Edit_A_Todo
 * @Delete_A_Todo
 ******************************************/

/*****************
 * @Create_A_Todo
 *****************/
exports.createTodo = async (req, res) => {
    try {
        const { title, user } = req.body;

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

/*****************
 * @Get_All_Todos
 *****************/
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({
            success: true,
            todos
        })
    } catch (error) {
        console.log(error);
    }
}

/*****************
 * @Edit_A_Todo
 *****************/
exports.editTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        todo.title = req.body.title;

        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, todo);

        res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            todo
        })
    } catch (error) {
        console.log(error);
    }
}

/*****************
 * @Delete_A_Todo
 *****************/
exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Todo is deleted successfully"
        })
    } catch (error) {
        console.log(error);
    }
}


/******************************************
 * @TASK_CONTROLLERS
 * @Get_All_Tasks
 * @Add_A_Task
 * @Edit_A_Task
 * @Delete_A_Task
 ******************************************/


/*****************
 * @Get_All_Tasks
 *****************/
exports.getAllTasks = async (req, res) => {
    try {
        const getTodo = await Todo.findById(req.params.id);

        //check if todo exists
        if (!getTodo) {
            throw new Error("Todo does not exists")
        }

        //get all tasks
        const tasks = getTodo.tasks;
        res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            tasks
        })
    } catch (error) {
        console.log(error);
    }
}

/*****************
 * @Add_A_Task
 *****************/
exports.addTask = async (req, res) => {
    try {
        const todoExist = await Todo.findById(req.params.id);

        // validation
        if (!todoExist) {
            throw new Error("Todo does not exist");
        }

        //add task
        todoExist.tasks.push({ taskTitle: req.body.task });
        console.log(todoExist);
        const todo = await Todo.findByIdAndUpdate(req.params.id, todoExist);

        res.status(200).json({
            success: true,
            message: "Task added successfully",
            todo
        })
    } catch (error) {
        console.log(error);
    }
}

/*****************
 * @Edit_A_Task
 *****************/
exports.editTask = async (req, res) => {
    try {
        const { todoId, taskId } = req.params;

        //todo validation - check if todo exist
        const todoExist = await Todo.findById(todoId);
        if (!todoExist) {
            throw new Error("Todo does not exist")
        }

        //task validation - check if task exist
        const taskExist = todoExist.tasks.some(element => element._id == taskId);
        if (!taskExist) {
            throw new Error("Task does not exists")
        }

        //find index of task and edit the title
        const taskIndex = todoExist.tasks.findIndex(obj => obj._id == taskId);
        todoExist.tasks[taskIndex].taskTitle = req.body.task;

        //update the todo with the new title
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, todoExist);

        res.status(200).json({
            success: true,
            message: "Task edited successfully",
            todo: todoExist
        })
    } catch (error) {
        console.log(error);
    }
}

/*****************
 * @Delete_A_Task
 *****************/
exports.deleteTask = async (req, res) => {
    try {
        const { todoId, taskId } = req.params;
        const todoExist = await Todo.findById(todoId);

        //check if todo exist
        if (!todoExist) {
            throw new Error("Todo does not exist")
        }

        //task validation - check if task exist
        const taskExist = todoExist.tasks.some(e =>  e._id == taskId );
        if (!taskExist) {
            throw new Error("Task does not exist")
        }

        //find index of task and delete it - and return updated todo
        const taskIndex = todoExist.tasks.findIndex(e => { e._id == taskId });
        todoExist.tasks.splice(taskIndex, 1);

        // update the todo
        const updatedTodo = await Todo.findByIdAndUpdate(todoId, todoExist);

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            todoExist
        })


    } catch (error) {
        console.log(error);
    }
}