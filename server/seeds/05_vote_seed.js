
exports.seed = (knex) => {
  // Inserts seed entries
  return knex('vote').insert([
    {
      id: '1',
      parentId: '87925db7-fb1e-4847-b601-b688def0dbca',
      userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
      voteType: 'INC',
    },
    {
      id: '2',
      parentId: '87925db7-fb1e-4847-b601-b688def0dbca',
      userId: 'a21d9bbe-796d-4403-8c10-accba4a6c689',
      voteType: 'DEC',
    },
  ]);
};
