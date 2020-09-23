const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');

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
        console.log("CART STARTS -> " + JSON.stringify(cart))
        console.log("<-- CART ENDS")
        return cart.getProducts()
        .then( products => {    
            console.log("PRODUCTS STARTS -> " + JSON.stringify(products))
            console.log("<-- PRODUCTS ENDS")
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

    req.user.getCart()
    .then( cart => {
        return cart.getProducts({ where: {id: productId}});
    })
    .then( products => {
        const product = products[0];
        return product.cartItem.destroy();
    })
    .then( result => {
        res.redirect('/cart');
    })
    .catch( err => {
        console.log(err);
    })
};

exports.getOrders = (req, res, next) => {
    req.user.getOrders({include: ['products']})
    .then( orders => {
        console.log("ORDERS -> " + orders)
        res.render('shop/orders', {
            pageTitle: "Orders", 
            path: '/orders',
            orders: orders
        });
    })
    .catch( err => {
        console.log(err)
    })
};


exports.createOrder = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
    .then( cart => {
        fetchedCart = cart;
        console.log(cart);
        return cart.getProducts();
    })
    .then( products => {
        return req.user.createOrder()
        .then( order => {
            return order.addProduct(products.map( product => {
                product.orderItem = { quantity: product.cartItem.quantity}
                return product;
            }));
        })
        .catch(err => {
            console.log(err);
        })
    })
    .then( result => {
        return fetchedCart.setProducts(null);
    })
    .then( result => {
        res.render('shop/checkout', {
            pageTitle: "Checkout", 
            path: '/checkout',
        });
    })
    .catch(err => {
        console.log(err);
    })
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