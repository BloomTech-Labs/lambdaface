const uuidv4 = require('uuid/v4');

exports.seed = (knex) => {
  // Inserts seed entries
  return knex('post').insert([
    {
      id: '87925db7-fb1e-4847-b601-b688def0dbca',
      content: 'Content Test 1',
      userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
      categoryId: 1,
    },
    {
      id: uuidv4(),
      content: 'Content Test 2',
      userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
      categoryId: 2,
    },
    {
      id: uuidv4(),
      content: 'Content Test 3',
      userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
      categoryId: 3,
    },
    {
      id: uuidv4(),
      content: 'Content Test 4',
      userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
      categoryId: 4,
    },
    {
      id: uuidv4(),
      content: 'Content Test 5',
      userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
      categoryId: 5,
    },
    {
      id: uuidv4(),
      content: 'Content Test 6',
      userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
      categoryId: 6,
    },
  ]);
};
