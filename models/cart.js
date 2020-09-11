const path = require('path');
const fs = require('fs');

const cart = [];


module.exports = class Cart {
    constructor(item){
        this.title = item.title,
        this.image = item.image,
        this.price = item.price
    }

    save() {
        cart.push(this);
    };

    static fetchAll(callback) {
        return cart;
    };
}