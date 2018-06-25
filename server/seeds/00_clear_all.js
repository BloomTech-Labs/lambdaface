exports.seed = async (knex) => {
  // Deletes existing entries from ALL tables
  await knex('vote').del();
  await knex('reply').del();
  await knex('comment').del();
  await knex('post').del();
  await knex('category').del();
  await knex('user').del();
};
