
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
        {
          id: 2,
          content: 'Test Comment 1',
          parentId: '87925db7-fb1e-4847-b601-b688def0dbca',
          userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
          parentType: 'post',
        },
        {
          id: 3,
          content: 'Test Comment 2',
          parentId: '87925db7-fb1e-4847-b601-b688def0dbca',
          userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
          parentType: 'post',
        },
        {
          id: 5,
          content: 'Test Comment 4',
          parentId: '5555',
          userId: 'a21d9bbe-796d-4403-8c10-accba4a6c689',
          parentType: 'comment',
        },
        {
          id: 5555,
          content: 'Test Comment 5',
          parentId: '87925db7-fb1e-4847-b601-b688def0dbca',
          userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
          parentType: 'post',
        },
      ]));
};
