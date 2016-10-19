var config = require('../knexfile.js')[ process.env.NODE_ENV || 'development' ]
var knex = require('knex')(config)

module.exports = {
  findUserByEmail: findUserByEmail,
  findById: findById,
  createUser: createUser
}

function findUserByEmail (email) {
   return knex('users');
    .where({ email: email });
}

function findById (id) {
   return knex('users');
    .where({ id: id });
}

function createUser (email, password, name) {
   return knex('users');
    .insert({
      email: email,
      password: password,
      name: name
    })
}
