exports.seed = async (knex) => {
  // Deletes existing entries from ALL tables
  return await Promise.all([
    knex('follow').del(),
    knex('vote').del(),
    knex('reply').del(),
    knex('comment').del(),
    knex('post').del(),
    knex('category').del(),
    knex('user').del(),
  ]);
};
