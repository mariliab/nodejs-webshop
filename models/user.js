const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExpiration: Date,
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
  },
});

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((cartProduct) => {
    return cartProduct.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  let newTotalPrice = this.cart.totalPrice;
  newTotalPrice += product.price;
  const updatedCartItems = [...this.cart.items];

  //if product exists
  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    //if product doesn't exist
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
    totalPrice: newTotalPrice,
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function (product) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== product._id.toString();
  });

  let newTotalPrice = this.cart.totalPrice;
  newTotalPrice = this.cart.totalPrice - product.price;

  this.cart = {
    items: updatedCartItems,
    totalPrice: newTotalPrice,
  };

  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = {
    items: [],
    totalPrice: 0,
  };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
