const passport         = require('passport');
const LocalStrategy    = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const db = require('../database/db');
const config = require('./config')

module.exports = function(passport) {

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    db.findById(id, (err, user) => {
      done(err, user);
    });
  });


  passport.use('login', new LocalStrategy(config.login));
  passport.use('signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
  },config.signup));

}
