const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
      pageTitle: "Add product", 
      path: '/admin/add-product',
    });
};

exports.getAllProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            pageTitle: 'Admin', 
            path: '/admin/products',
            products: products}
        );
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product({
        title: req.body.title, 
        image: req.body.image,
        price: req.body.price
    });
    if (req.body.title) {
        product.save(product);
        res.redirect('/admin/products');
    }
    else {
      res.send('Add a product!')
    }
};