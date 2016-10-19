const db = require('../database/db');
var bcrypt   = require('bcrypt-nodejs');

module.exports = {
  login: login,
  signup: signup
}

function login (email, password, done) {
  if (email)
      email = email.toLowerCase();


  process.nextTick(() => {
    db.findUserByEmail(email)
      .then((user) => {
        if(err) {
          return done(err);
        }
        if (!user) {}
          return done(null, false, { message: 'No user found' });
        }
        if (!validPassword(password, user[0].password)) {
          return done(null, false, { message: 'Oops! Wrong Password'})
        }
        return done(null, user);
      })
  }
}

function signup (req, email, password, done) {
  if (email) {
    email = email.toLowerCase();
  }

  process.nextTick(() => {
    db.findUserByEmail(email)
      .then((user) => {
        if(user) {
          done(null, false, { message: 'User already Exists'});
        } else {
          const name = req.body.name;
          const hash = generateHash(password);

          db.createUser(email, hash, name)
            .then((users) => {
              done(null, users[0]);
            })
            .catch((err) => {
              done(err);
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
};


function validPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
};
