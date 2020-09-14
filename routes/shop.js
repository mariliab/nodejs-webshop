const path = require('path');
const express = require('express');
const router = express.Router();

//controllers
const shopController = require('../controllers/shop');

// / => GET STARTPAGE
router.get('/', shopController.getStartPage);

// / => GET
router.get('/products', shopController.getAllProducts);

// / => GET PRODUCT
router.get('/products/:productId', shopController.getProduct);

// / => GET ORDERS
router.get('/orders', shopController.getOrders);

// / => GET CART
router.get('/cart', shopController.getCart);

// / => GET CHECKOUT PAGE
router.get('/checkout', shopController.getCheckout);

module.exports = router; 