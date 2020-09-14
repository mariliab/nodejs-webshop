const path = require('path');
const fs = require('fs');

const filePath = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(filePath, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex]; 

            let updatedProduct;
            if (existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.quantity = updatedProduct.quantity + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {id: id, quantity: 1};
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + +productPrice;

            fs.writeFile(filePath, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
    };
};