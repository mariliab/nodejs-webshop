const path = require('path');
const fs = require('fs');
const Cart = require('../models/cart');

const filePath = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = callback => {
    fs.readFile(filePath, (err, fileContent) => {
        if (err) {
            return callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(product){
        this.id = product.id;
        this.title = product.title,
        this.image = product.image,
        this.price = product.price,
        this.description = product.description,
        this.created = new Date();
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);

                const updatedProducts = [...products];

                updatedProducts[existingProductIndex] = this;
                fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(filePath, JSON.stringify(products), err => {
                    console.log(err);
                });
            }

        });
    };

    static fetchAll(callback) {
        getProductsFromFile(callback);
    };
 
    static fetchProduct(id, callback) {
        getProductsFromFile(products => {
            const productItem = products.find(product => product.id == id);
            callback(productItem);
        });
    };

    static deleteProduct(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);

            fs.writeFile(filePath, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProduct(id, product.price);
                }
                console.log(err);
            });
        });
    };
}