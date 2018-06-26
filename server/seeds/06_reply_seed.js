exports.seed = (knex) => {
  return knex.raw('SET foreign_key_checks = 0;').then(() => {
    // Inserts seed entries
    return knex('reply').insert([
      {
        id: '43270',
        content: 'Test Comment',
        parentId: '3',
        userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
      },
      {
        id: '34217605786320',
        content: 'Test Comment 1',
        parentId: '3',
        userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
      },
      {
        id: '123456',
        content: 'Test Comment 2',
        parentId: '5555',
        userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
      },
      {
        id: '99999999999999999999999999999999',
        content: 'Test Comment 5',
        parentId: '5555',
        userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
      },
    ]);
  });
};
  