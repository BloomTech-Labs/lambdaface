
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(() => {
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
    });
};
