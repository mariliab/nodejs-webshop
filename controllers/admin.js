const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
      pageTitle: "Add product", 
      path: '/admin/add-product',
    });
};

exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.fetchProduct(productId, productItem => {
        res.render('admin/edit-product', {
            pageTitle: "Edit product", 
            path: '/admin/edit-product',
            product: productItem
        });
    });
};

exports.updateProduct = (req, res, next) => {
    const productId = req.body.productId;
    const title = req.body.title;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;

    const updatedProductObject = {
        id: productId,
        title: title,
        image: image,
        price: price,
        description: description
    }

    const updatedProduct = new Product(updatedProductObject);
    updatedProduct.save();

    res.redirect('/admin/products');
};

exports.deleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteProduct(productId);
    res.redirect('/admin/products');
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
    const id = null;
    const title = req.body.title;
    const image = req.body.image;
    const price = req.body.price;
    const description = req.body.description;
    if (req.body.title) {
        const product = new Product({id, title, image, price, description
        });
        product.save(product);
        res.redirect('/admin/products');
    }
    else {
      res.send('Add a product!')
    }
};