const express = require('express');
const { home } = require('../controllers/todoControllers');

const router = express.Router();

router.get("/", home);

module.exports = router;