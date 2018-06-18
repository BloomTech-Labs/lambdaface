
exports.up = function(knex, Promise) {
  return knex.raw('SET foreign_key_checks = 0;').then(() => {
    return knex.schema.createTable('comment', (table) => {
      table
        .uuid('id')
        .primary()
        .notNullable();

      table
        .text('content')
        .notNullable();

      table
        .string('parentId');

      table
        .foreign('parentId')
        .references('post.id');

      table
        .string('userId')

      table
        .foreign('userId')
        .references('user.id')

      table
        .timestamp('createdAt')
        .defaultTo(knex.fn.now());

      table
        .integer('upvotes')
        .defaultTo(0);

      table
        .integer('downvotes')
        .defaultTo(0);

      table
        .string('parentType')
        .notNullable();
    });
  })
  // .finally(() => knex.raw('SET foreign_key_checks = 0;'));
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('comment');
};
