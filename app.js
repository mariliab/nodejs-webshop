require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

// routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

// controllers
const errorController = require('./controllers/error');

// database
const mongoose = require('mongoose');
const User = require('./models/user');
const MONGODB_URI = 'mongodb+srv://MaryLee:' + process.env.MONGODB_DATABASE_PASSWORD + '@nodejscompleteguide.9f4ka.mongodb.net/NodeJScompleteguide?retryWrites=true&w=majority';

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
    secret: 'my secret', 
    resave: false, 
    saveUninitialized: false,
    store: store
}));

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
  .then(user => {
      req.user = user;
      next();
  })
  .catch(err => console.log(err));
});

// routes
app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);
app.use('/auth', authRoutes);
app.use('/', shopRoutes);
app.use(errorController.get404Page);

mongoose.connect(
  MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then( result => {
  app.listen(port);
  console.log("Server is started!");
})
.catch( err => {
  console.log(err);
});