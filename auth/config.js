const db = require('../database/db');
const bcrypt   = require('bcrypt-nodejs');

module.exports = {
  login,
  signup
}

function login (req, email, password, done) {
  if (email)
      email = email.toLowerCase();

  process.nextTick(() => {
    db.findUserByEmail(email)
      .then((user) => {
        if (!user) {
          return done(null, false, req.flash('loginMessage', 'No user found.'));
        }
        if (!validPassword(password, user[0].password)) {
          return done(null, false, req.flash('loginMessage', 'Wrong password'))
        }
        return done(null, [user[0].id]);
      })
      .catch((err) => {
        return done(err)
      })
  })
}

function signup (req, email, password, done) {
  if (email) {
    email = email.toLowerCase();
  }
  process.nextTick(() => {
    db.findUserByEmail(email)
      .then((user) => {
        if(user && user[0]) {
          done(null, false, req.flash('loginMessage', 'No user found.'));
        } else {
          const name = req.body.name;
          const hash = generateHash(password);
          
          db.createUser(email, hash, name)
            .then((user) => {
              return done(null, user);
            })
            .catch((err) => {
              return done(err);
            })
        }
      })
      .catch((err) => {
        done(err);
      })

   })
}



function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}


function validPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
};
