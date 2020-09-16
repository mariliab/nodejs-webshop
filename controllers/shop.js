const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getAllProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/products', {
            pageTitle: 'Shop', 
            path: '/products',
            products: products}
        );
    });
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.fetchProduct(productId, productItem => {
        res.render('shop/product-detail', {
            pageTitle: productItem.title, 
            path: '/product-detail',
            product: productItem
        });
    });
};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({productData: product, quantity: cartProductData.quantity});
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Cart', 
                path: '/cart',
                products: cartProducts,
                totalPrice: cart.totalPrice
            });
        });
    });
};

exports.addToCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.fetchProduct(productId, product => {
        Cart.addProduct(productId, product.price);
    });
    res.redirect('/cart');
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
    Product.fetchAll(products => {
        res.render('shop/index', {
            pageTitle: 'Shop', 
            path: '/',
            products: products}
        );
    });
};