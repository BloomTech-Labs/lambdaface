exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  const arr = [
    await knex('votes').del(),
    await knex('child_comment').del(),
    await knex('comment').del(),
    await knex('post').del(),
    await knex('category').del(),
    await knex('user').del(),
  ]
  console.log(arr);
};
  