const Product = require('../models/product');
const mongodb = require('mongodb');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
      pageTitle: "Add product", 
      path: '/admin/add-product',
    });
};

exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.fetchProduct(productId).then( product => {
        res.render('admin/edit-product', {
            pageTitle: "Edit product", 
            path: '/admin/edit-product',
            product: product
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.updateProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImage = req.body.image;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const product = new Product(
        updatedTitle, 
        updatedPrice, 
        updatedImage, 
        updatedDescription, 
        productId
    );
    product.save()
    .then( result => {
        console.log("Updated product!");
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err);
    });
};

exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteProduct(productId)
    .then(() => {
        console.log("Product deleted!")
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getAllProducts = (req, res, next) => {
    Product.fetchAllProducts()
    .then(products => {
        res.render('admin/products', {
            pageTitle: 'Admin', 
            path: '/admin/products',
            products: products}
        );
    })
    .catch( err => {
        console.log(err);
    }) 
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const image = req.body.image;
    const description = req.body.description;
    const product = new Product(title, price, image, description, null, req.user._id);
    product.save()
    .then(result => {
        console.log("Created product!");
        res.redirect('/admin/products');
    }).catch( err => {
        console.log(err);
    });
};