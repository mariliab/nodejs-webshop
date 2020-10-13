const path = require('path');
const express = require('express');
const router = express.Router();

//controllers
const authController = require('../controllers/auth');


// GET Sign up page
router.get('/signup', authController.getSignup);

// POST Sign up
router.post('/signup', authController.postSignup);

// GET Login page
router.get('/login', authController.getLogin);

// POST login
router.post('/login', authController.postLogin);

// POST login
router.post('/logout', authController.postLogout);

module.exports = router;