const path = require('path');
const express = require('express');
const router = express.Router();

//controllers
const shopController = require('../controllers/shop');
const cartController = require('../controllers/cart');

// / => GET
router.get('/', shopController.getAllProducts);

// / => GET
router.get('/product-list', shopController.getAllProducts);

// / => GET STARTPAGE
router.get('/', shopController.getStartPage);

// / => GET CART
router.get('/cart', shopController.getCart);

// / => GET CHECKOUT PAGE
router.get('/checkout');

module.exports = router; 