const express = require('express');
const { home, createTodo, getAllTodos, editTodo, deleteTodo,
    getAllTasks, addTask, editTask, deleteTask, sortByCreateDate, sortByModifiedDate } = require('../controllers/todoControllers');
const { register, login, dashboard, logout } = require('../controllers/userControllers');
const auth = require('../middlewares/auth');

const router = express.Router();

//Todo Routes
router.get("/", home);
router.post("/api/todo/create", auth, createTodo);
router.get("/getAllTodos", getAllTodos);
router.put("/editTodo/:id", editTodo);
router.delete("/deleteTodo/:id", deleteTodo);

//Todo - Sorting routes
router.get("/sortByCreateDate", sortByCreateDate);
router.get("/sortByModifiedDate", sortByModifiedDate);

//Task Routes
router.get("/getAllTasks/:id", getAllTasks);
router.post("/addTask/:id", addTask);
router.put("/editTask/:todoId/:taskId", editTask);
router.delete("/deleteTask/:todoId/:taskId", deleteTask);


//User Routes
router.post("/register", register);
router.post("/login", login);
router.get("/dashboard", auth, dashboard);
router.post("/logout", logout);

module.exports = router;