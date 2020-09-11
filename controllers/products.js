const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
      pageTitle: "Add product", 
      path: '/admin/add-product',
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product({
        title: req.body.title, 
        image: req.body.image
    });
    if (req.body.title) {
        console.log("postAddProduct: " + req.body.title);
        product.save(product);
        res.redirect('/');
    }
    else {
      res.send('Add a product!')
    }
};

exports.getAllProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop', {
            pageTitle: 'Shop', 
            path: '/',
            products: products}
        );
    });
};