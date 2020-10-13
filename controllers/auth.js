const User = require('../models/user');

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        pageTitle: "Sign up", 
        path: '/signup',
        isAuthenticated: req.session.isLoggedIn
      });
};

exports.postSignup = (req, res, next) => {
    res.redirect('/');
};

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: "Login", 
        path: '/login',
        isAuthenticated: req.session.isLoggedIn
      });
};

exports.postLogin = (req, res, next) => {
    User.findById("5f743614cd36e875a2f78d43")
    .then(user => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save( err => {
            console.log(err);
            res.redirect('/');
        });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
};