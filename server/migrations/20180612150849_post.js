
exports.up = function(knex, Promise) {
  return knex.schema.createTable('post', (tbl) => {
    tbl
      .uuid('id')
      .primary()
      .notNullable();

    tbl
      .string('title', 128)
      .notNullable();

    tbl
      .text('content')
      .notNullable();

    tbl
      .integer('userId')
      .references('id').inTable('user');

    tbl
      .integer('categoryId')
      .references('id').inTable('category');

    tbl
      .timestamp('createdAt')
      .defaultTo(knex.fn.now());

    tbl
      .timestamp('updatedAt')
      .defaultTo(null);

    tbl
      .integer('viewCount')
      .defaultTo(0);

    tbl
      .integer('commentCount')
      .defaultTo(0);

    tbl
      .integer('commentCount')
      .defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('post');
};
