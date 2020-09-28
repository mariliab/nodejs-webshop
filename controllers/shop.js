const Product = require('../models/product');
const User = require('../models/user');

exports.getAllProducts = (req, res, next) => {
    Product.fetchAllProducts()
    .then( products => {
        res.render('shop/products', {
            pageTitle: 'Shop', 
            path: '/products',
            products: products
        });
    }).catch( err => {
        console.log(err)
    });
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.fetchProduct(productId)
    .then( product => {
        res.render('shop/product-detail', {
            pageTitle: product.title, 
            path: '/product-detail',
            product: product
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getCart = (req, res, next) => {
    req.user
      .getCart()
      .then(products => {
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products
        });
      })
      .catch(err => console.log(err));
  };

exports.postToCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.fetchProduct(productId)
    .then( product => {
        return req.user.addToCart(product);
    })
    .then( result => {
        res.redirect('/cart');
    })
    .catch( err => {
        console.log(err);
    })
};

exports.deleteFromCart = (req, res, next) => {
    const productId = req.body.productId;
    req.user
      .deleteProductFromCart(productId)
      .then(result => {
        res.redirect('/cart');
      })
      .catch(err => console.log(err));
  };

exports.getOrders = (req, res, next) => {
    req.user
    .getOrders()
    .then( orders => {
        res.render('shop/orders', {
            pageTitle: "Orders", 
            path: '/orders',
            orders: orders
        });
    })
    .catch( err => {
        console.log(err);
    })
};


exports.createOrder = (req, res, next) => {
    req.user.addOrder()
    .then( result => {
        res.redirect('shop/orders');
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getStartPage = (req, res, next) => {
    Product.fetchAllProducts().then( products => {
        res.render('shop/index', {
            pageTitle: "Startpage", 
            path: '/',
            products: products
          });
    }).catch( err => {
        console.log(err)
    });
};