
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comment').del()
    .then(() =>
      // Inserts seed entries
      knex('comment').insert([
        {
          id: 1,
          content: 'Test Comment',
          parentId: '87925db7-fb1e-4847-b601-b688def0dbca',
          userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
          parentType: 'post',
        },
      ]));
};
