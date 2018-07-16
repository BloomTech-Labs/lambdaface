
exports.seed = (knex) => {
  // Inserts seed entries
  return knex('user').insert([
    {
      id: '-1',
      firstName: 'deleted',
      lastName: 'comment',
      email: '',
      profilePicture: 'https://s3-us-west-2.amazonaws.com/lambdaface-photos/photos/defaultProfile.jpg'
    },
  ]);
};
