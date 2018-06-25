
<<<<<<< HEAD
exports.seed = function(knex, Promise) {
=======
exports.seed = (knex) => {
>>>>>>> c43dc0cc3312b65d6f977c07f9da252c1ddaf37b
  // Inserts seed entries
  return knex('user').insert([
    {
      id: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
      firstName: 'Kevin',
      lastName: 'Ceee',
      email: 'kevin@lambdaface.com',
    },
    {
      id: 'a21d9bbe-796d-4403-8c10-accba4a6c689',
      firstName: 'Thomas',
      lastName: 'Kevin',
      email: 'kevin_is_the_man@lambdaface.com',
    },
  ]);
};
