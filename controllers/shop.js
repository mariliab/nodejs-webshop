const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getAllProducts = (req, res, next) => {
    Product.findAll().then( products => {
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
    Product.findByPk(productId).then( product => {
        res.render('shop/product-detail', {
            pageTitle: product.title, 
            path: '/product-detail',
            product: product
        });
    }).catch(err => {
        console.log(err);
    });
};

exports.getCart = (req, res, next) => {
    req.user.getCart()
    .then(cart => {
        console.log("CART: " + cart)
        return cart.getProducts()
        .then( products => {    
            res.render('shop/cart', {
                pageTitle: "Your cart", 
                path: '/cart',
                products: products
              });
        }).catch( err => {
            console.log(err)
        });
    })
    .catch( err => {
        console.log(err)
    });
};

exports.addToCart = (req, res, next) => {
    const productId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user
    .getCart()
    .then( cart => {
        fetchedCart = cart;
        return cart.getProducts({ where: {id: productId}})
    })
    .then( products => {
        let product;
        if (products.length > 0) {
            product = products[0];
        }
        if (product) {
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product;
        }
        return Product.findByPk(productId)
    })
    .then( product => {
        return fetchedCart.addProduct(product, {through: {
            quantity: newQuantity
        }});
    })
    .then(() => {
        res.redirect('/cart');
    })
    .catch( err => {
        console.log(err);
    });
};

exports.deleteFromCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.fetchProduct(productId, product => {
        const productPrice = product.price;
        Cart.deleteProduct(productId, productPrice);
        res.redirect('/cart');
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
      pageTitle: "Orders", 
      path: '/orders',
    });
};


exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
      pageTitle: "Checkout", 
      path: '/checkout',
    });
};

exports.getStartPage = (req, res, next) => {
    Product.findAll().then( products => {
        res.render('shop/index', {
            pageTitle: "Startpage", 
            path: '/',
            products: products
          });
    }).catch( err => {
        console.log(err)
    });
};