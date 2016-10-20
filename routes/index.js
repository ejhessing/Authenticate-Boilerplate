module.exports = (app, passport) => {

    app.get('/', (req, res) => {
        res.render('index');
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });


    app.post('/login', passport.authenticate('login', {
        successRedirect : '/secret',
        failureRedirect : '/',
        failureFlash : true
    }));



    app.get('/signup', (req, res) => {
        res.render('signup');
    });

    app.post('/signup', passport.authenticate('signup', {
        successRedirect : '/',
        failureRedirect : '/signup',
        failureFlash : true
    }));

    app.get('/secret', isLoggedIn, (req, res) => {
        res.render('secret');
    })

}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
