
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', (tbl) => {
    tbl.increments('id');

    tbl
      .string('name', 125)
      .notNullable()
      .unique('name', 'uq_username');

    tbl
      .string('password', 125)
      .notNullable();

    tbl
      .timestamp('created_at')
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
