
<<<<<<< HEAD
exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('comment').insert([
=======
exports.seed = (knex) => {
  // Inserts seed entries
  knex('comment').insert([
>>>>>>> c43dc0cc3312b65d6f977c07f9da252c1ddaf37b
    {
      id: '1',
      content: 'Test Comment',
      parentId: '87925db7-fb1e-4847-b601-b688def0dbca',
      userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
      parentType: 'post',
    },
    {
      id: '2',
      content: 'Test Comment 1',
      parentId: '87925db7-fb1e-4847-b601-b688def0dbca',
      userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
      parentType: 'post',
    },
    {
      id: '3',
      content: 'Test Comment 2',
      parentId: '87925db7-fb1e-4847-b601-b688def0dbca',
      userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
      parentType: 'post',
    },
    {
      id: '5555',
      content: 'Test Comment 5',
      parentId: '87925db7-fb1e-4847-b601-b688def0dbca',
      userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
      parentType: 'post',
    },
  ]);
};
