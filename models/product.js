const products = [];

module.exports = class Product {
    constructor(product){
        this.title = product.title,
        this.image = product.image
    }

    save() {
        products.push(this);
    }

    static fetchAll() {
        return products;
    }
}