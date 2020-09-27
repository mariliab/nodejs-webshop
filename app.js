
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
app.use((req, res, next) => {
    User.findUser("5f70bb312f7bbea19cf0ae61")
      .then(user => {
        req.user = new User(user.name, user.email, user.cart, user._id);
        next();
      })
      .catch(err => console.log(err));
});

//routes
app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);
app.use('/', shopRoutes);
app.use(errorController.get404Page);

mongoConnect.mongoConnect(() => {
    app.listen(port);
});