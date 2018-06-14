
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', (tbl) => {
    tbl
      .uuid('id')
      .primary()
      .notNullable();

    tbl
      .string('firstName', 64)
      .notNullable();

    tbl
      .string('lastName', 64)
      .notNullable();

    tbl
      .string('email', 125)
      .notNullable()
      .unique();

    // tbl
    //   .string('password', 125)
    //   .notNullable();

    tbl
      .timestamp('createdAt')
      .defaultTo(knex.fn.now());

    tbl
      .text('profilePicture');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
