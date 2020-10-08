const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
      pageTitle: "Add product", 
      path: '/admin/add-product',
      isAuthenticated: req.session.isLoggedIn
    });
};

exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId).then( product => {
        res.render('admin/edit-product', {
            pageTitle: "Edit product", 
            path: '/admin/edit-product',
            product: product,
            isAuthenticated: req.session.isLoggedIn
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

    Product.findById(productId)
    .then( product => {
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.description = updatedDescription;
        product.image = updatedImage;
        return product.save()
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
    Product.findByIdAndRemove(productId)
    .then(() => {
        console.log("Product deleted!")
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getAllProducts = (req, res, next) => {
    console.log("Admin get products: + cookie" + req.get('Cookie'));
    Product.find()
    // .select('title price description')
    // .populate('userId', 'name email')
    .then(products => {
        res.render('admin/products', {
            pageTitle: 'Admin', 
            path: '/admin/products',
            products: products,
            isAuthenticated: req.session.isLoggedIn
        });
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
    const product = new Product({title: title, price: price, image: image, description: description, userId: req.session.user._id});
    product.save()
    .then(result => {
        console.log("Created product!");
        res.redirect('/admin/products');
    }).catch( err => {
        console.log(err);
    });
};