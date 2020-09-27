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
    res.render('shop/cart', {
        pageTitle: "Your cart", 
        path: '/cart',
      });
};

exports.postToCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.fetchProduct(productId)
    .then( product => {
        //console.log("YES vi fick tillbaka en product: " + JSON.stringify(product));
        return req.user.addToCart(product);
    })
    .then( result => {
        res.redirect('/cart');
    })
    .catch( err => {
        console.log(err);
    })
};

// exports.deleteFromCart = (req, res, next) => {
//     const productId = req.body.productId;

//     req.user.getCart()
//     .then( cart => {
//         return cart.getProducts({ where: {id: productId}});
//     })
//     .then( products => {
//         const product = products[0];
//         return product.cartItem.destroy();
//     })
//     .then( result => {
//         res.redirect('/cart');
//     })
//     .catch( err => {
//         console.log(err);
//     })
// };

// exports.getOrders = (req, res, next) => {
//     req.user.getOrders({include: ['products']})
//     .then( orders => {
//         console.log("ORDERS -> " + orders)
//         res.render('shop/orders', {
//             pageTitle: "Orders", 
//             path: '/orders',
//             orders: orders
//         });
//     })
//     .catch( err => {
//         console.log(err)
//     })
// };


// exports.createOrder = (req, res, next) => {
//     let fetchedCart;
//     req.user.getCart()
//     .then( cart => {
//         fetchedCart = cart;
//         console.log(cart);
//         return cart.getProducts();
//     })
//     .then( products => {
//         return req.user.createOrder()
//         .then( order => {
//             return order.addProduct(products.map( product => {
//                 product.orderItem = { quantity: product.cartItem.quantity}
//                 return product;
//             }));
//         })
//         .catch(err => {
//             console.log(err);
//         })
//     })
//     .then( result => {
//         return fetchedCart.setProducts(null);
//     })
//     .then( result => {
//         res.render('shop/checkout', {
//             pageTitle: "Checkout", 
//             path: '/checkout',
//         });
//     })
//     .catch(err => {
//         console.log(err);
//     })
// };

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