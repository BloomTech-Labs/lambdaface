const uuidv4 = require('uuid/v4');

exports.seed = (knex) => {
  // Inserts seed entries
  return knex('reply').insert([
    {
      id: uuidv4(),
      parentId: '87925db7-fb1e-4847-b601-b688def0dbca',
      userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
    },
  ]);
};