const path = require('path');
const fs = require('fs');

module.exports = class Product {
    constructor(product){
        this.title = product.title,
        this.image = product.image
    }

    save() {
        const filePath = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'products.json'
        );
        console.log("Filepath is : " + filePath);
        fs.readFile(filePath, (err, fileContent) => {
            let products = [];
            if (!err) {
                console.log("fileContent" + fileContent);
                products = JSON.parse(fileContent);
            };
            console.log("PRODUCTS: " + products + typeof products);
            console.log("THIS: " + this + typeof this);
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), (err) => {
                console.log(err);
            });
            console.log("PRODUCTS after push: " + products + typeof products);
        });
    };

    static fetchAll(callback) {
        const filePath = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'products.json'
        );
        fs.readFile(filePath, (err, fileContent) => {
            if (err) {
                return callback([]);
            }
            callback(JSON.parse(fileContent));
        });
    };
}