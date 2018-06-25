
exports.up = function(knex, Promise) {
  return knex.schema.createTable('vote', (table) => {
    table
      .uuid('id')
      .notNullable();

    table
      .primary(['parentId', 'userId']);

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
  return knex.schema.dropTableIfExists('vote');
};
