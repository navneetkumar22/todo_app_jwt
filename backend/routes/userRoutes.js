const express = require('express');
const { home } = require('../controllers/todoControllers');
const { register, login, dashboard } = require('../controllers/userControllers');
const auth = require('../middlewares/auth');

const router = express.Router();

//Todo Routes
router.get("/", home);

//User Routes
router.post("/register", register);
router.post("/login", login);
router.get("/dashboard", auth, dashboard);

module.exports = router;