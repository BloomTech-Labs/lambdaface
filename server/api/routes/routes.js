const {
  getPosts,
  getPostById,
  createPost,
  editPost,
  deletePost,
  getComments,
  editComment,
  createComment,
  deleteComment,
  createUser,
} = require('../controllers');

module.exports = (server) => {
  server.route('/api/posts')
    .get(getPosts)
    .post(createPost);
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
  server.route('/api/users')
    .post(createUser);
};
