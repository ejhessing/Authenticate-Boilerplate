const config = require('../knexfile.js')[ process.env.NODE_ENV || 'development' ];
const knex = require('knex')(config);



module.exports = {
  findUserByEmail,
  findById,
  createUser,
  getUsersDB,
  getResetDB,
  addToken,
  resetPassword
}

function findUserByEmail (email) {
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
             expiredAt: Date.now() + 3600000
          });
    });
}

function resetPassword (token) {
  const time = Date.now()
  
}

function getUsersDB () {
  return knex('users');
}

function getResetDB () {
   return knex('reset');
}
