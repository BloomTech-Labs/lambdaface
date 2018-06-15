
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('category').del()
    .then(() => {
      // Inserts seed entries
      return knex('category').insert([
        { name: 'Announcements' },
        { name: 'Dev Team' },
        { name: 'Design Team' },
        { name: 'Marketing' },
        { name: 'HR' },
        { name: 'Product Managers' },
        { name: 'QA' },
      ]);
    });
};
