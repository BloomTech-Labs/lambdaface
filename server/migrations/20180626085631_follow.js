
exports.up = function(knex, Promise) {
  return knex.schema.createTable('follow', (table) => {
    table
      .uuid('id')
      .notNullable();

    table
      .primary(['parentId', 'userId']);

    table
      .string('parentId')
      .references('post.id')
      .onDelete('CASCADE');

    table
      .string('userId')
      .references('user.id')
      .onDelete('CASCADE');
    
    table
      .timestamp('createdAt')
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('follow');
};
