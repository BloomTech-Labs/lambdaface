
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comment', (tbl) => {
    tbl
      .uuid('id')
      .primary()
      .notNullable();

    tbl
      .text('content')
      .notNullable();

    tbl
      .integer('parentId')
      .references('id').inTable('post');

    tbl
      .integer('userId')
      .references('id').inTable('user');

    tbl
      .timestamp('createdAt')
      .defaultTo(knex.fn.now());

    tbl
      .integer('upvotes')
      .defaultTo(0);

    tbl
      .integer('downvotes')
      .defaultTo(0);

    tbl
      .string('parentType')
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('comment');
};
