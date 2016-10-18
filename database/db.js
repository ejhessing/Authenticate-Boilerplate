var config = require('../knexfile.js')[ process.env.NODE_ENV || 'development' ]
var knex = require('knex')(config)

module.exports = {
  findUser: findUser
}

function findUser (email) {
   return knex('users');
    .where({ email: email });
}

function findById (id) {
   return knex('users');
    .where({ id: id });
}
