
exports.up = function(knex, Promise) {
  return knex.raw('SET foreign_key_checks = 0;').then(() => {
    return knex.schema.createTable('reply', (table) => {
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
        .references('comment.id')
        .onDelete('CASCADE');

      table
        .string('userId')

      table
        .foreign('userId')
        .references('user.id')

      table
        .timestamp('createdAt')
        .defaultTo(knex.fn.now());
    });
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('reply');
};
