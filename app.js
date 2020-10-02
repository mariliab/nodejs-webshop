
require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

//routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

//controllers
const errorController = require('./controllers/error');

//database
const mongoose = require('mongoose');
const User = require('./models/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({ secret: 'my secret', resave: false, saveUninitialized: false })
);

//user
app.use((req, res, next) => {
    User.findById("5f743614cd36e875a2f78d43")
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
});

app.use((req, res, next) => {
  const cookies = req.get('Cookie');
  const isLoggedIn = cookies.includes('loggedIn=true');
  req.isLoggedIn = isLoggedIn;
  next();
})

//routes
app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);
app.use('/auth', authRoutes);
app.use('/', shopRoutes);
app.use(errorController.get404Page);

mongoose.connect('mongodb+srv://MaryLee:' + process.env.MONGODB_DATABASE_PASSWORD + '@nodejscompleteguide.9f4ka.mongodb.net/NodeJScompleteguide?retryWrites=true&w=majority', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then( result => {
  // const user = new User({
  //   name: "Marilia",
  //   email: "marilia@morpheus.se",
  //   cart: {
  //     items: []
  //   }
  // });
  //user.save()
  app.listen(port);
})
.catch( err => {
  console.log(err);
});