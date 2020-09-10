const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();
const products = [];

router.get('/add-product', (req, res, next) => {
    console.log("Start page");
    res.render('add-product', {
      pageTitle: "Add product", 
      path: '/admin/add-product',
      products: JSON.stringify(products)
    });
});

router.post('/add-product', (req, res, next) => {
    console.log(JSON.stringify(req.body, null, 2));
    if (req.body.title) {
      products.push({title: req.body.title, image: req.body.image})
      res.redirect('/');
    }
    else {
      res.send('Add a product!')
    }
  });

//module.exports = router;
exports.routes = router;
exports.products = products;