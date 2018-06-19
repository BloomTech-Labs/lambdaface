/* To Do:
  For view count:
  Keep track of UserIDs on post
*/

const knex = require('../../database/db.js');
const uuidv4 = require('uuid/v4');

const SUCCESS_CODE = 200;
const CREATED_CODE = 201;
const NOT_FOUND_ERROR = 404;
const USER_ERROR = 422;
const SERVER_ERRROR = 500;

const getPosts = (req, res) => {
  const { category } = req.params;

  const fetch = (() => {
    if (category) {
      return knex('post').where({ categoryId: category });
    }
    return knex('post');
  })();

  fetch.then(async (response) => {
    const sent = [];
    for (let i = 0; i < response.length; i++) {
      const { id, userId } = response[i];
      const votes = await knex('votes').where({ parentId: id });
      const [ user ] = await knex('user').where({ id: userId });

      sent.push({
        ...response[i],
        upvotes: votes.filter(v => v.voteType === 'INC').length,
        downvotes: votes.filter(v => v.voteType === 'DEC').length,
        user,
      });
    }
    console.log(sent);
    res.status(SUCCESS_CODE).json(sent);
  })
  .catch((error) => {
    res.status(SERVER_ERRROR).json({ error });
  });
};

const getNewPosts = (req, res) => {
  knex('post').orderBy('createdAt', 'desc')
    .then(async (response) => {
      for (let i = 0; i < response.length; i++) {
        // Todo:
        // clean this up
        // make .count() work in knex.
        const upvotes = await knex('votes')
          .where({ parentId: response[i].id, voteType: 'INC' });

        const downvotes = await knex('votes')
          .where({ parentId: response[i].id, voteType: 'DEC' });

        const user = await knex('user')
          .where({ id: response[i].userId });
        
        response[i] = {
          ...response[i],
          upvotes: upvotes.length,
          downvotes: downvotes.length,
          user: user[0],
        };
      }
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
};



const searchPosts = (req, res) => {
  const { q } = req.query;
  const rawQuery =  'SELECT * FROM post WHERE MATCH (title, content) AGAINST ("' +q+ '" IN NATURAL LANGUAGE MODE)'

  knex.raw(rawQuery)
    .then(([response]) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(422).json(error);
    })
}

const getPostById = (req, res) => {
  const { id } = req.params;

  knex('post').where({ id })
    .then(async ([ response ]) => {

      await knex('post')
        .where({ id })
        .update({ viewCount: ++response.viewCount });
      
      const [ user ] = await knex('user')
        .where({ id: response.userId });

      res.status(200).json({ ...response, user });
    })
    .catch((error) => {
      res.status(NOT_FOUND_ERROR).json({
        message: "The post was not found or no longer exists.",
        database_error: error,
      });
    });
};

const createPost = (req, res) => {
  const id = uuidv4();
  const {
    title, content, userId, categoryId,
  } = req.body;

  if (!title || !content ) {
    return res.status(USER_ERROR).json({
      error: 'Posts MUST contain a title and content',
      title, content,
    });
  }
  
  knex.insert({
    id, title, content, userId, categoryId,
  }).into('post')
    .then((response) => {
      res.status(201).json({ success: response });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
};

const editPost = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;


  const updatedAt = knex.fn.now();

  knex('post')
    .where({ id })
    .update({ title, content, updatedAt })
    .then((response) => {
      res.status(200).json({ success: response });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
};

const deletePost = (req, res) => {
  const { id } = req.params;

  knex('post')
    .where({ id })
    .del()
    .then((response) => {
      res.status(200).json({ success: response });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
};

module.exports = {
  getPosts,
  getNewPosts,
  searchPosts,
  getPostById,
  createPost,
  editPost,
  deletePost,
};
