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
  getVotes,
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
    .post(postVote)
    .get(getVotes);
};
