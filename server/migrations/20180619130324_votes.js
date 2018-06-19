
exports.up = function(knex, Promise) {
  return knex.schema.createTable('votes', (table) => {
    table
      .uuid('id')
      .primary()
      .notNullable();

    table
      .string('parentId')
      .references('post.id')

    table
      .string('userId')
      .references('user.id');

    table
      .string('voteType')
      .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('votes');
};
