
exports.up = function(knex, Promise) {
  return knex.schema.createTable('post', (tbl) => {
    tbl.increments('id');

    tbl
      .text('content')
      .notNullable();

    tbl
      .integer('user_id')
      .references('id').inTable('users');

    tbl
      .integer('category_id')
      .references('id').inTable('categories');

    tbl
      .timestamp('created_at')
      .defaultTo(knex.fn.now());

    tbl
      .integer('views')
      .defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('post');
};
