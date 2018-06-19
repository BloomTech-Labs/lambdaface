
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
          userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
          categoryId: 1,
        },
        {
          title: 'Test Title 2',
          content: 'Content Test 2',
          userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
          categoryId: 2,
        },
        {
          title: 'Test Title 3',
          content: 'Content Test 3',
          userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
          categoryId: 3,
        },
        {
          title: 'Test Title 4',
          content: 'Content Test 4',
          userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
          categoryId: 4,
        },
        {
          title: 'Test Title 5',
          content: 'Content Test 5',
          userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
          categoryId: 5,
        },
        {
          title: 'Test Title 6',
          content: 'Content Test 6',
          userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
          categoryId: 6,
        },
      ]);
    });
};
