const express = require('express');
const { home, createTodo } = require('../controllers/todoControllers');
const { register, login, dashboard, logout } = require('../controllers/userControllers');
const auth = require('../middlewares/auth');

const router = express.Router();

//Todo Routes
router.get("/", home);
router.post("/api/v1/todo/create", auth, createTodo);

//User Routes
router.post("/register", register);
router.post("/login", login);
router.get("/dashboard", auth, dashboard);
router.post("/logout", logout);

module.exports = router;