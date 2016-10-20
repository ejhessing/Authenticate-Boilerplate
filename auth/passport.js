const passport         = require('passport');
const LocalStrategy    = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const db = require('../database/db');
const config = require('./config')

module.exports = function(passport) {

  passport.serializeUser((user, done) => {
    done(null, user[0]);
  });

  passport.deserializeUser((user, done) => {
  db.findById(user)
    .then((user) => {
      done(null, user[0].id)
    })
    .catch((err) => {
      done(err)
    })
  });


  passport.use('login', new LocalStrategy({
    passReqToCallback : true
  }, config.login));
  
  passport.use('signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
  },config.signup));

}
