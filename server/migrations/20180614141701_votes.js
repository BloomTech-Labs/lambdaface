
exports.up = function(knex, Promise) {
  return knex.schema.createTable('votes', (table) => {
    table
      .uuid('id')
      .primary()
      .notNullable();

    table
      .integer('parentId')
      .references('id').inTable('post');

    table
      .integer('userId')
      .references('id').inTable('user');

    table
      .string('voteType')
      .notNullable();

    // table
    //   .string('parentType')
    //   .notNullable();
  });
};
    
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('votes');
};
    