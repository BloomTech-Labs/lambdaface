
/** 
 * user schema
 *    id          - integer, primary key
 *    firstName   - 64 character length
 *    lastName    - 64 character length
 *    email       - 125 character length
 *    createdAt   - Auto Generated ke
 */

exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', (table) => {
    table
      .uuid('id')
      .primary()
      .notNullable();

    table
      .string('firstName', 64)
      .notNullable();

    table
      .string('lastName', 64)
      .notNullable();

    table
      .string('email', 125)
      .notNullable()
      .unique();

    table
      .timestamp('createdAt')
      .defaultTo(knex.fn.now());

    table
      .text('profilePicture');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
