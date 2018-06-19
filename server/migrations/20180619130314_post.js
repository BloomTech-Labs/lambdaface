
exports.up = function(knex, Promise) {
  return knex.raw('SET foreign_key_checks = 0;').then(() => {
    return knex.schema.createTable('post', (table) => {
      table
        .uuid('id')
        .primary()
        .notNullable();

      table
        .string('title', 128)
        .notNullable();

      table
        .text('content')
        .notNullable();

      table
        .string('userId');

      table
        .foreign('userId')
        .references('user.id');

      table
        .integer('categoryId');

      table
        .foreign('categoryId')
        .references('category.id');

      table
        .timestamp('createdAt')
        .defaultTo(knex.fn.now());

      table
        .timestamp('updatedAt')
        .defaultTo(null);

      table
        .integer('viewCount')
        .defaultTo(0);

      table
        .integer('commentCount')
        .defaultTo(0);
    });
  })
  // .finally(() => knex.raw('SET foreign_key_checks = 0;'));
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('post');
};
