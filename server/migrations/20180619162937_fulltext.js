
exports.up = function(knex, Promise) {
  let createQuery = `ALTER TABLE post 
    ADD FULLTEXT (title, content)`
  return knex.raw(createQuery);
}

exports.down = function(knex, Promise) {
  let dropQuery = `ALTER TABLE post
    DROP "FULLTEXT"`
  return knex.raw(dropQuery);
}