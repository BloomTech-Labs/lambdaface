
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', (tbl) => {
    tbl
      .uuid('id')
      .primary()
      .notNullable();

    tbl
      .string('first_name', 64)
      .notNullable();

    tbl
      .string('last_name', 64)
      .notNullable();

    tbl
      .string('email', 125)
      .notNullable()
      .unique();

    // tbl
    //   .string('password', 125)
    //   .notNullable();

    tbl
      .timestamp('created_at')
      .defaultTo(knex.fn.now());

    tbl
      .timestamp('updated_at')
      .defaultTo(null);

    tbl
      .text('profile_picture');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
