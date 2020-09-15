const path = require('path');
const express = require('express');
const router = express.Router();

//controllers
const adminController = require('../controllers/admin');

// /admin/products => GET
router.get('/products', adminController.getAllProducts);

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/edit-product => GET
router.get('/edit-product/:productId', adminController.getEditProduct);

// /admin/edit-product => POST
router.post('/edit-product', adminController.updateProduct);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

module.exports = router;