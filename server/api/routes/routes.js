const {
  getPosts,
  getNewPosts,
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
  server.route('/api/posts/newest')
    .get(getNewPosts);
  server.route('/api/posts')
    .get(getPosts)
    .post(createPost);
  server.route('/api/search')
    .get(searchPosts);
  server.route('/api/posts/:id')
    .get(getPostById)
    .put(editPost)
    .delete(deletePost);
  server.route('/api/comments/:parentId')
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
