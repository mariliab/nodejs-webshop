exports.getLogin = (req, res, next) => {
    const cookies = req.get('Cookie');
    const isLoggedIn = cookies.includes('loggedIn=true');
    res.render('auth/login', {
        pageTitle: "Login", 
        path: '/login',
        isAuthenticated: isLoggedIn
      });
};

exports.postLogin = (req, res, next) => {
    //res.setHeader('Set-Cookie', 'loggedIn=true');
    res.cookie('loggedIn', true);
    res.redirect('/');
};