
require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

//routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//controllers
const errorController = require('./controllers/error');

//data
const sequelize = require('./util/database');
const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1).then( user => {
        console.log("User: " + JSON.stringify(user));
        req.user = user;
        next();
    })
    .catch( err => {
        console.log(err);
    }); 
});

//routes
app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);
app.use('/', shopRoutes);
app.use(errorController.get404Page);

Product.belongsTo(User, {constrains: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});
Product.belongsToMany(Order, {through: OrderItem});

sequelize
//.sync({force: true})
.sync()
.then( result => {
    return User.findByPk(1);
    console.log(result);
})
.then( user => {
    if (!user) {
        return User.create({ name: "Marilia", email : "marilia@morpheus.se"})
    }
    return Promise.resolve(user);
})
.then( user => {
    console.log("USER: " + JSON.stringify(user));
    return user.createCart();
})
.then( cart => {
    console.log("Cart: " + cart)
    app.listen(port);
})
.catch( err => {
    console.log(err);
});
