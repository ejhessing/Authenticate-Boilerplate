const passport         = require('passport');
const LocalStrategy    = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const db = require('../database/db');
const config = require('./config')

module.exports = function(passport) {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.findById(id, (err, user) => {
      done(err, user);
    });
  });


  passport.use('login', new LocalStrategy(auth.login));
  passport.use('signup', new LocalStrategy(auth.signup));

}
