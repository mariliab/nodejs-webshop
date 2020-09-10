const path = require('path');
const express = require('express');
const router = express.Router();

//controllers
const productsController = require('../controllers/products');

// / => GET
router.get('/', productsController.getAllProducts);

module.exports = router; 