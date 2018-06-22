const {
  getPosts,
  searchPosts,
  getPostById,
  createPost,
  editPost,
  deletePost,
  getComments,
  editComment,
  createComment,
  deleteComment,
  createUser,
  viewUsers,
  editUser,
  postVote,
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

  server.route('/api/comments/:parentId/')
    .get(getComments);

  server.route('/api/comments/:id')
    .put(editComment);

  server.route('/api/comments/delete/:id')
    .put(deleteComment);

  server.route('/api/comments')
    .post(createComment);

  server.route('/api/users/:id')
    .put(editUser);

  server.route('/api/users')
    .get(viewUsers)
    .post(createUser);

  server.route('/api/votes')
    .post(postVote);
};
