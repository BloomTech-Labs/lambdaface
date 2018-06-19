const {
  getPosts,
  getNewPosts,
  searchPosts,
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
  viewUsers,
  editUser,
} = require('./users');

const {
  postVote,
} = require('./votes');

module.exports = {
  getPosts,
  getNewPosts,
  searchPosts,
  getPostById,
  createPost,
  editPost,
  deletePost,
  getComments,
  createComment,
  editComment,
  deleteComment,
  createUser,
  viewUsers,
  editUser,
  postVote,
};
