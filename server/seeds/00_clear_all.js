exports.seed = async function(knex, Promise) {
  // Deletes existing entries from ALL tables
  await knex('votes').del();
  await knex('child_comment').del();
  await knex('comment').del();
  await knex('post').del();
  await knex('category').del();
  await knex('user').del();
};
  