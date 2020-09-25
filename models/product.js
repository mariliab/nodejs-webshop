const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectID;

class Product {
    constructor(title, price, image, description, id, userId){
        this.title = title;
        this.price = price;
        this.image = image;
        this.description = description;
        this._id = id ? new ObjectId(id) : null;
        this.userId = userId;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            dbOp = 
                db.collection('products')
                .updateOne({ _id: this._id }, { $set: this });
        } else {
            dbOp = db.collection('products').insertOne(this); 
        }
        return dbOp
        .then( result => {
            console.log("Result: " + result);
        })
        .catch( err => {
            console.log(err);
        });
    }

    static fetchAllProducts() {
        const db = getDb();
        return db.collection('products').find().toArray()
            .then( products => {
                console.log(products);
                return products;
            })
            .catch( err => {
                console.log(err);
            });
    }

    static fetchProduct(productId) {
        const db = getDb();
        return db.collection('products')
        .find({ _id: new mongodb.ObjectID(productId)})
        .next()
        .then( product => {
            console.log(product);
            return product;
        })
        .catch( err => {
            console.log(err);
        });
    }

    static deleteProduct(productId) {
        const db = getDb();
        return db.collection('products').deleteOne({ _id: new mongodb.ObjectID(productId)})
        .then( result => {
            console.log("Deleted product!");
        })
        .catch( err => {
            console.log(err);
        });
    }
}

module.exports = Product;