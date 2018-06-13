
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('post').del()
    .then(() => {
      // Inserts seed entries
      return knex('post').insert([
        {
          id: '87925db7-fb1e-4847-b601-b688def0dbca',
          title: 'Test Title 1',
          content: 'Content Test 1',
          user_id: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
          category_id: 2,
        },
      ]);
    });
};
