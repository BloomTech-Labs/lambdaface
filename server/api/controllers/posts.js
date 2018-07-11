/* To Do:
  For view count:
  Keep track of UserIDs on post
*/
const uuidv4 = require('uuid/v4');

const knex = require('../../database/db.js');
const { _joinUser, httpCodes, _joinVote } = require('./helpers.js')

const {
  SUCCESS_CODE,
  CREATED_CODE,
  NOT_FOUND_ERROR,
  USER_ERROR,
  SERVER_ERRROR,
} = httpCodes;

const getPosts = (req, res) => {
  const { page = 1, category = '1', filter = '' } = req.params;
  const limit = 20;
  let fetch = knex('post');
  if (category.match(/[1-7]/) !== null) {
    fetch = fetch.where({ categoryId: category });
  }
  if (filter === 'newest') {
    fetch = fetch.orderBy('createdAt', 'desc');
  } else {
    fetch = fetch.orderBy(knex.raw('(v.upvotes * 5) - EXTRACT(HOUR FROM (NOW() - post.createdAt))'), 'DESC');
    fetch = fetch.select(knex.raw('*, NOW() - post.createdAt AS ITEM2'))
  }

  fetch
    .limit(limit)
    .offset((page - 1) * limit)
    .join( ..._joinUser('post') )
    .leftJoin( ..._joinVote('post', 'INC') )
    .leftJoin( ..._joinVote('post', 'DEC', 'dv') )
    .then((response) => {
      console.log(response);
      res.status(SUCCESS_CODE).json(response);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(SERVER_ERRROR).json({ error })
    });
};

const searchPosts = (req, res) => {
  const { query } = req.params;

  knex('post')
    .where(knex.raw('content LIKE "%' + query + '%"'))
    .join( ..._joinUser('post') )
    .leftJoin( ..._joinVote('post', 'INC') )
    .leftJoin( ..._joinVote('post', 'DEC', 'dv') )
    .then((response) => {
      res.status(SUCCESS_CODE).json(response);
    })
    .catch((error) => {
      res.status(USER_ERROR).json(error);
    })
}

const getPostById = (req, res) => {
  const { id, userId } = req.params;

  knex('post')
    .where({ id })
    .join( ..._joinUser('post') )
    .leftJoin( ..._joinVote('post', 'INC') )
    .leftJoin( ..._joinVote('post', 'DEC', 'dv') )
    .then(async ([ response ]) => {

      await knex('post')
        .where({ id })
        .update({ viewCount: ++response.viewCount });

      const arr = await knex('follow').where({ parentId: id, userId });

      if (arr.length === 1) {
        response.following = true;
      } else if (arr.length === 0) {
        response.following = false;
      }

      res.status(SUCCESS_CODE).json(response);
    })
    .catch((error) => {
      res.status(NOT_FOUND_ERROR).json({
        message: "The post was not found or no longer exists.",
        database_error: error,
        error_code: NOT_FOUND_ERROR,
      });
    });
};

const createPost = (req, res) => {
  const id = uuidv4();
  const {
    content, userId, categoryId,
  } = req.body;

  if ( !content ) {
    return res.status(USER_ERROR).json({
      error: 'Posts MUST contain content',
      content,
    });
  }
  
  knex.insert({
    id, content, userId, categoryId,
  }).into('post')
    .then((response) => {
      res.status(CREATED_CODE).json({ success: response });
    })
    .catch((error) => {
      res.status(USER_ERROR).json({ error });
    });
};

const editPost = (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const updatedAt = knex.fn.now();

  knex('post')
    .where({ id })
    .update({ content, updatedAt })
    .then((response) => {
      res.status(SUCCESS_CODE).json({ success: response });
    })
    .catch((error) => {
      res.status(USER_ERROR).json({ error });
    });
};

const deletePost = (req, res) => {
  const { id } = req.params;

  knex('post')
    .where({ id })
    .del()
    .then((response) => {
      res.status(SUCCESS_CODE).json({ success: response });
    })
    .catch((error) => {
      res.status(USER_ERROR).json({ error });
    });
};

module.exports = {
  getPosts,
  searchPosts,
  getPostById,
  createPost,
  editPost,
  deletePost,
};