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
  addFollower,
  removeFollower,
  signS3,
  webSocketConnect,
} = require('../controllers');

module.exports = (server) => {
  server.route([ '/api/posts', '/api/posts/:page', '/api/posts/:page/:category', '/api/posts/:page/:category/:filter' ])
    .get(getPosts)
    .post(createPost);
  
  server.route('/api/search/:query')
    .get(searchPosts);

  server.route('/api/post/:id/:userId')
    .get(getPostById)
    .put(editPost)
    .delete(deletePost);

  server.route(['/api/comments/:parentId/:userId', '/api/comments/child/:parentId'])
    .get(isChildComment, getComments);

  server.route(['/api/comments/:id', '/api/comments/child/:id'])
    .put(isChildComment, editComment);

  server.route(['/api/comments/delete/:id', '/api/comments/delete/child/:id'])
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

  server.route('/api/follows')
    .post(addFollower)
    .delete(removeFollower);

  server.route('/s3/sign')
    .get(signS3)

  require('express-ws')(server);  

  server.ws('/ws', webSocketConnect)

};
