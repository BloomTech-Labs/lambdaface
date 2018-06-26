/** 
 * category schema
 *    id    - integer, primary key
 *    name  - 128 character length
 */

exports.up = function(knex, Promise) {
  return knex.schema.createTable('category', (table) => {
    table
      .integer('id')
      .primary();

    table
      .string('name', 128);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('category');
};
