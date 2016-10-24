const db = require("../database/db");
const crypto = require('crypto');
const async = require('async');
const nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
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
            db.resetPassword(token, email)
            db.findUserByEmail(email)
              .then((data) => {
                req.session.token = token;
                req.session.email = email;
                res.redirect("sendEmail")
              })
        });
    });
    
    app.get("/sendEmail", (req, res) => {
      const token = req.session.token;
      const emailAddress = req.session.email;
      
      const options = {
        auth: {
          api_key: process.env.SGApi
        }
      }
          
      const mailer = nodemailer.createTransport(sgTransport(options));
          
      const email = {
        to: emailAddress,
        from: 'passwordreset@example.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/resetPassword/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
        
      mailer.sendMail(email, function(err, res) {
          if (err) { 
              console.log(err) 
          }
          console.log(res);
       });
    
    })
    

    

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
