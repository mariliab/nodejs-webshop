exports.getLogin = (req, res, next) => {
    //console.log("Get LOGIN page")
    //const cookies = req.get('Cookie');
    //console.log("Cookies are -> " + cookies);
    //const isLoggedIn = cookies.includes('loggedIn=true');
    //console.log("isLoggedIn? -> " + isLoggedIn);
    console.log("SESSION: " + req.session.isLoggedIn);
    res.render('auth/login', {
        pageTitle: "Login", 
        path: '/login',
        isAuthenticated: req.session.isLoggedIn
      });
};

exports.postLogin = (req, res, next) => {
    //res.setHeader('Set-Cookie', 'loggedIn=true');
    //res.cookie('loggedIn', true);
    // var hour = 3600000
    // req.session.cookie.expires = new Date(Date.now() + hour)
    // req.session.cookie.maxAge = hour
    req.session.isLoggedIn = true;
    res.redirect('/');
};

exports.postLogout = (req, res, next) => {
    req.session.isLoggedIn = false;
    //res.setHeader('Set-Cookie', 'loggedIn=false');
    res.redirect('/');
};