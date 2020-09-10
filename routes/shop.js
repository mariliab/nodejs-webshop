const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();
const adminData = require('./admin');

router.get('/', (req, res, next) => {
    console.log("Shop.js: " + JSON.stringify(adminData.products, null, 2));
    console.log("adminData.products: " + adminData.products)
    res.render('shop', {
        pageTitle: 'Shop', 
        path: '/',
        products: adminData.products})
});

module.exports = router; 