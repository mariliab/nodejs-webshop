const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
      pageTitle: "Add product", 
      path: '/admin/add-product',
    });
};

exports.getEditProduct = (req, res, next) => {
    const product = req.body.title;
    console.log("Edit product: " + JSON.stringify(product));
    res.render('admin/edit-product', {
      pageTitle: "Edit product", 
      path: '/admin/edit-product',
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
    const title = req.body.title;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;
    if (req.body.title) {
        const product = new Product({title, image, price, description
        });
        product.save(product);
        res.redirect('/admin/products');
    }
    else {
      res.send('Add a product!')
    }
};