
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', (tbl) => {
    tbl.increments('id');

    tbl
      .text('content')
      .notNullable();

    tbl
      .integer('post_id')
      .references('id').inTable('post');

    tbl
      .integer('user_id')
      .references('id').inTable('user');

    tbl
      .timestamp('created_at')
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('comment');
};
