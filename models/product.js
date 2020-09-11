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
        this.price = product.price
    }

    save() {
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
}