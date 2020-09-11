const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            pageTitle: 'Shop', 
            path: '/shop/product-list',
            products: products}
        );
    });
};

exports.getStartPage = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('/', {
            pageTitle: 'Startpage', 
            path: '/',
            products: products}
        );
    });
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
      pageTitle: "Cart", 
      path: '/shop/cart',
    });
};