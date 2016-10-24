const db = require("../database/db");
const crypto = require('crypto');
const async = require('async');
const nodemailer = require('nodemailer');
require('dotenv').config()


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
    
    app.get('/forgot', (req, res) => {
        res.render('forgot');
    });
    
    app.post("/forgot", (req, res) => {
        const email = req.body.email;
        
        crypto.randomBytes(20, function(err, buf) {
            if(err) console.log(err)
            var token = buf.toString('hex');
            console.log(token, email)
            db.resetPassword(token, email)
            db.findUserByEmail(email)
                .then((data) => {
                    console.log(data)
                    res.redirect("reset")
                })


        });
    });
    
    
    

    app.get('/secret', isLoggedIn, (req, res) => {
        res.render('secret');
    })
    
    app.get('/users', (req, res) => {
        db.getUsersDB()
            .then((data) => {
                res.json({data: data})
            })
    })
    
    app.get('/reset', (req, res) => {
        db.getResetDB()
            .then((data) => {
                res.json({data: data})
            })
    })

}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
