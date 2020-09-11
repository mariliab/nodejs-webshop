
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
const errorController = require('./controllers/error')

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);
app.use(errorController.get404Page);

app.listen(port);