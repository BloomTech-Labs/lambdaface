
const uuidv4 = require('uuid/v4');

exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', (tbl) => {
    tbl
      .uuid('id')
      .defaultTo(uuidv4())
      .primary();

    tbl
      .text('content')
      .notNullable();

    tbl
      .integer('parent_id')
      .references('id').inTable('post');

    tbl
      .integer('user_id')
      .references('id').inTable('user');

    tbl
      .timestamp('created_at')
      .defaultTo(knex.fn.now());

    tbl
      .integer('upvotes')
      .defaultTo(0);

    tbl
      .integer('downvotes')
      .defaultTo(0);

    tbl
      .string('parent_type')
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('comment');
};
