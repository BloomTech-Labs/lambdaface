const {
  getPosts,
  searchPosts,
  getPostById,
  createPost,
  editPost,
  deletePost,
  isChildComment,
  getComments,
  editComment,
  createComment,
  deleteComment,
  createUser,
  viewUsers,
  editUser,
  getUserById,
  postVote,
<<<<<<< HEAD
  signS3,
=======
  getVotes
>>>>>>> c2d4a2c01f3b363c100ed5393c1578343c9ffb3c
} = require('../controllers');

module.exports = (server) => {
  server.route([ '/api/posts', '/api/posts/:page', '/api/posts/:page/:filter'])
    .get(getPosts)
    .post(createPost);
  
  server.route('/api/search/:query')
    .get(searchPosts);

  server.route('/api/post/:id')
    .get(getPostById)
    .put(editPost)
    .delete(deletePost);

  server.route(['/api/comments/:parentId', '/api/comments/child/:parentId'])
    .get(isChildComment, getComments);

  server.route('/api/comments/:id')
    .put(isChildComment, editComment);

  server.route('/api/comments/delete/:id')
    .put(isChildComment, deleteComment);

  server.route('/api/comments')
    .post(isChildComment, createComment);

  server.route('/api/users/:id')
    .get(getUserById)
    .put(editUser);

  server.route('/api/users')
    .get(viewUsers)
    .post(createUser);

  server.route('/api/votes')
<<<<<<< HEAD
    .post(postVote);

  server.route('/s3/sign')
    .get(signS3);
=======
    .post(postVote)
    .get(getVotes);
>>>>>>> c2d4a2c01f3b363c100ed5393c1578343c9ffb3c
};
