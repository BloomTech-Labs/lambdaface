
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('category').del()
    .then(() => {
      // Inserts seed entries
      return knex('category').insert([
        { id: 1, name: 'Announcements' },
        { id: 2, name: 'Dev Team' },
        { id: 3, name: 'Design Team' },
        { id: 4, name: 'Marketing' },
        { id: 5, name: 'HR' },
        { id: 6, name: 'Product Managers' },
        { id: 7, name: 'QA' },
      ]);
    });
};
