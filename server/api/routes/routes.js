const {
  getPosts,
  getPostById,
  createPost,
  editPost,
  deletePost,
} = require('../controllers');

module.exports = (server) => {
  server.route('/api/posts')
    .get(getPosts)
    .post(createPost);
  server.route('/api/notes/:id')
    .get(getPostById)
    .put(editPost)
    .delete(deletePost);
};
