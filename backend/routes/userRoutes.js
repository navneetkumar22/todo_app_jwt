const express = require('express');
const { home } = require('../controllers/todoControllers');
const { register, login } = require('../controllers/userControllers');

const router = express.Router();

//Todo Routes
router.get("/", home);

//User Routes
router.post("/register", register);
router.post("/login", login);

module.exports = router;