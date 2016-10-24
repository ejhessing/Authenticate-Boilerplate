const config = require('../knexfile.js')[ process.env.NODE_ENV || 'development' ];
const knex = require('knex')(config);
const auth = require('../auth/config')

module.exports = {
  findUserByEmail: findUserByEmail,
  findById,
  createUser,
  getUsersDB,
  getResetDB,
  addToken,
  resetPassword
}


function findUserByEmail (email) {
  console.log(email)
  return knex('users')
    .where({ email: email });
}

function findById (id) {
   return knex('users')
    .where({ id: id });
}

function createUser (email, password, name) {
   return knex('users')
    .insert({
      email: email,
      password: password,
      name: name
    })
    .returning('id');
}

function addToken (token, email) {
  const expiredAt = Date.now() + 3600000
   findUserByEmail(email)
    .then((user) => {
       if(!user) {
          console.log('error', "No user with that email address exists");
          return ('error');
       } 
       return knex('reset')
          .insert({
            user_id: user[0].id,
            token: token,
            expiredAt: expiredAt
          });
    });
}

function resetPassword (email, password, token) {
  const time = Date.now();
  const hash = auth.generateHash(password);
  return knex('reset')
    .where({ token: token })
    .then((data) => {
      if(data[0].expiredAt < time) {
        console.log("Sorry this link has now expired");
        return;
      }
      updatePassword(email, hash)
    })
    .catch((err) => {
      console.log(err);
    });
}

function updatePassword (email, hash) {
  return knex('users')
    .where({ email: email })
    .update({ password: hash})
    .catch((err) => {
      console.log(err);
    });
}

function getUsersDB () {
  return knex('users');
}

function getResetDB () {
   return knex('reset');
}

