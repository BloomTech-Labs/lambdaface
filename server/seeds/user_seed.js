
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(() => {
      // Inserts seed entries
      return knex('user').insert([
        {
          id: 'e143939c-f8ef-4737-a168-8c2a1e47eea7',
          first_name: 'Kevin',
          last_name: 'Ceee',
          email: 'kevin@lambdaface.com',
        },
      ]);
    });
};
