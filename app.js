
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

//database
const mongoConnect = require('./util/database');
const User = require('./models/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//user
app.use((req,res,next) => {
    User.findUser("5f6da34254d2f0ec289037e9")
    .then( user => {
        req.user = user;
        console.log("User is: " + req.user);
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

mongoConnect.mongoConnect(() => {
    app.listen(port);
});