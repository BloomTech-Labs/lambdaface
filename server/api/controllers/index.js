const {
  getPosts,
  getPostById,
  createPost,
  editPost,
  deletePost,
} = require('./posts');

const {
  getComments,
  createComment,
  editComment,
  deleteComment,
} = require('./comments');

const {
  createUser,
} = require('./users');

const {
  postVote
} = require('./votes');

module.exports = {
  getPosts,
  getPostById,
  createPost,
  editPost,
  deletePost,
  getComments,
  createComment,
  editComment,
  deleteComment,
  createUser,
  postVote,
};
