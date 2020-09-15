const path = require('path');
const fs = require('fs');

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
        this.title = product.title,
        this.image = product.image,
        this.price = product.price,
        this.description = product.description,
        this.created = new Date();
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), (err) => {
                console.log(err);
            });
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

    static updateProduct(updatedProduct) {
        getProductsFromFile(products => {
            const existingProductIndex = products.findIndex(prod => prod.id === updatedProduct.id);
            const existingProduct = products[existingProductIndex];

            if (existingProduct) {
                products[existingProductIndex] = updatedProduct;
            }

            fs.writeFile(filePath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    };
}