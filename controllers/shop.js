const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');

exports.getStartPage = (req, res, next) => {
    Product.find()
    .then( products => {
        res.render('shop/index', {
            pageTitle: "Startpage", 
            path: '/',
            products: products,
            isAuthenticated: req.session.isLoggedIn
          });
    }).catch( err => {
        console.log(err)
    });
};

exports.getAllProducts = (req, res, next) => {
    Product.find()
    .then( products => {
        res.render('shop/products', {
            pageTitle: 'Shop', 
            path: '/products',
            products: products,
            isAuthenticated: req.session.isLoggedIn
        });
    }).catch( err => {
        console.log(err)
    });
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
    .then( product => {
        res.render('shop/product-detail', {
            pageTitle: product.title, 
            path: '/product-detail',
            product: product,
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getCart = (req, res, next) => {
    req.user
      .populate('cart.items.productId')
      .execPopulate()
      .then(user => {
        const products = user.cart.items;
        const totalPrice = user.cart.totalPrice;
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products,
          totalPrice: totalPrice,
          isAuthenticated: req.session.isLoggedIn
        });
      })
      .catch(err => console.log(err));
  };

exports.postToCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId)
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
    Product.findById(productId)
    .then( product => {
        return req.user.removeFromCart(product);
    })
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err));
  };

exports.getOrders = (req, res, next) => {
    Order.find({'user.userId' : req.session.user._id})
    .then( orders => {
        res.render('shop/orders', {
            pageTitle: "Orders", 
            path: '/orders',
            orders: orders,
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch( err => {
        console.log(err);
    })
};


exports.createOrder = (req, res, next) => {
    req.user
      .populate('cart.items.productId')
      .execPopulate()
      .then(user => {
        const products = user.cart.items.map(i => {
            return { 
                quantity: i.quantity,
                product: { ...i.productId._doc }
            }
        });
        const order = new Order({
            user: {
                name: req.user.name,
                email: req.user.email,
                userId: req.user._id
            },
            products: products,
            totalPrice: user.cart.totalPrice
        });
        return order.save();
    })
    .then( result => {
        req.user.clearCart();
    })
    .then(() => {
        res.redirect('/shop/orders');
    })
    .catch(err => {
        console.log(err);
    })
};