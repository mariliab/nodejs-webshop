const path = require('path');
const express = require('express');
const router = express.Router();

//controllers
const authController = require('../controllers/auth');

// GET Login page
router.get('/login', authController.getLogin);

// POST login
router.post('/login', authController.postLogin);

module.exports = router;