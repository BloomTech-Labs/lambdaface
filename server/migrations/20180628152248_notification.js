exports.up = function(knex, Promise) {
  return knex.raw('SET foreign_key_checks = 0;').then(() => {
    return knex.schema.createTable('notification', (table) => {
      table
        .uuid('id')
        .primary()
        .notNullable();

      table
        .string('sourceId');

      table
        .foreign('sourceId')
        .references('user.id');
      
      table
        .string('targetId')

      table
        .foreign('targetId')
        .references('user.id')
        .onDelete('CASCADE');

      table
        .string('postId')
      
      table
        .foreign('postId')
        .references('post.id')
        .onDelete('CASCADE');
      
      table
        .string('type')
        .notNullable();
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notification');
};
