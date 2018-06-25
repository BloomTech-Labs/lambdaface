
<<<<<<< HEAD
exports.seed = function(knex, Promise) {
=======
exports.seed = (knex) => {
  // Inserts seed entries
>>>>>>> c43dc0cc3312b65d6f977c07f9da252c1ddaf37b
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
<<<<<<< HEAD
      userId: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
=======
      userId: 'a21d9bbe-796d-4403-8c10-accba4a6c689',
>>>>>>> c43dc0cc3312b65d6f977c07f9da252c1ddaf37b
      voteType: 'DEC',
    },
  ]);
};
