
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary()
    table.integer('user_id')
    table.string('token')
    table.date('expiredAt')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
