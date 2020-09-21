const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
      pageTitle: "Add product", 
      path: '/admin/add-product',
    });
};

exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findByPk(productId).then( product => {
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

    Product.findByPk(productId).then( product => {
        product.title = updatedTitle;
        product.image = updatedImage;
        product.price = updatedPrice;
        product.description = updatedDescription;
        return product.save();
    })
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
    Product.findByPk(productId)
    .then(product => {
        return product.destroy();
    })
    .then( result => {
        console.log("Product deleted!");
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getAllProducts = (req, res, next) => {
    Product.findAll().then( products => {
        res.render('admin/products', {
            pageTitle: 'Admin', 
            path: '/admin/products',
            products: products}
        );
    }).catch( err => {
        console.log(err)
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;
    req.user.createProduct({        
        title: title,
        price: price,
        image: image,
        description: description
    })
    .then(result => {
        console.log("Created product!");
        res.redirect('/admin/products');
    }).catch( err => {
        console.log(err);
    });
};