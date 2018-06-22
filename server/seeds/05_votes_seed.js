
exports.seed = function(knex, Promise) {
  return knex('votes').insert([
    {
      id: '1',
      parentId: '87925db7-fb1e-4847-b601-b688def0dbca',
      userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
      voteType: 'INC',
    },
    {
      id: '2',
      parentId: '87925db7-fb1e-4847-b601-b688def0dbca',
      userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
      voteType: 'DEC',
    },
  ]);
};
