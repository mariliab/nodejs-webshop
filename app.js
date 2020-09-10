
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

//routes
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/admin', adminData.routes);
app.use(shopRoutes);
app.use((req, res, next) => {
  res.status(404).render('404', {pageTitle: "Page not found!"});
});

app.listen(port);