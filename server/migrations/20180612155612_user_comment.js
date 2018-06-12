
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_comment', (tbl) => {
    tbl.increments('id');

    tbl
      .integer('user_id')
      .references('id')
      .inTable('user');

    tbl
      .integer('comment_id')
      .references('id')
      .inTable('comment');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_comment');
};
