const getDb = require('../util/database').getDb;
const ObjectId = require('mongodb').ObjectID;

class User {
    constructor(username, email, cart, id){
        this.name = username;
        this.email = email;
        this.cart = cart; //cart.items
        this._id = id ? new ObjectId(id) : null
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        const cartProductIndex = this.cart.findIndex(cartProduct => {
          return cartProduct.productId.toString() === product._id.toString();
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart];
    
        if (cartProductIndex >= 0) {
          newQuantity = this.cart[cartProductIndex].quantity + 1;
          updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
          updatedCartItems.push({
            productId: new ObjectId(product._id),
            quantity: newQuantity
          });
        }
        const updatedCart = updatedCartItems;
        const db = getDb();
        return db
          .collection('users')
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: updatedCart } }
          );
      }

    getCart() {
        const db = getDb();
        const productIds = this.cart.map(i => {
          return i.productId;
        });
        return db
          .collection('products')
          .find({ _id: { $in: productIds } })
          .toArray()
          .then(products => {
            return products.map(p => {
              return {
                ...p,
                quantity: this.cart.find(i => {
                  return i.productId.toString() === p._id.toString();
                }).quantity
              };
            });
        });
    }

    deleteProductFromCart(productId) {
        const updatedCartItems = this.cart.filter(item => {
          return item.productId.toString() !== productId.toString();
        });
        const db = getDb();
        return db
          .collection('users')
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: updatedCartItems } }
        );
    }

    static findUser(userId){
        const db = getDb();
        return db.collection('users').findOne({ _id: new ObjectId(userId) })
        .then( user => {
            console.log(user)
            return user;
        })
        .catch( err => {
            console.log(err);
        });
    }
}

module.exports = User;