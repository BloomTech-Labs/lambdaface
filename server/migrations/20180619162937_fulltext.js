
exports.up = function(knex, Promise) {
  let createQuery = `ALTER TABLE post 
    ADD FULLTEXT (content)`
  return knex.raw(createQuery);
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('post');
}