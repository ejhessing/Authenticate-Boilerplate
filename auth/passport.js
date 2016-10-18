const LocalStrategy    = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const db = require('../database/db');

passport.serializeUser((user,done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.findById(id, (err, user) => {
    done(err, user);
  })
})
