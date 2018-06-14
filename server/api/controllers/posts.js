const knex = require('../../database/db.js');
const uuidv4 = require('uuid/v4');

const getPosts = (req, res) => {

  knex('post')
    .then(async (response) => {
      for (let i = 0; i < response.length; i++) {
        // Todo:
        // clean this up
        // make .count() work in knex.
        const upvotes = await knex('votes').where({ parentId: response[i].id, voteType: 'INC' });
        const downvotes = await knex('votes').where({ parentId: response[i].id, voteType: 'DEC' });
        response = { upvotes: upvotes.length , downvotes : downvotes.length, ...response[i] };
      }
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
};

const getPostById = (req, res) => {
  const { id } = req.params;

  knex('post').where({ id })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
};

const createPost = (req, res) => {
  const id = uuidv4();
  const {
    title, content, userId, categoryId,
  } = req.body;

  knex.insert({
    id, title, content, userId, categoryId,
  }).into('post')
    .then((response) => {
      res.status(201).json({ success: response });
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
};

const editPost = (req, res) => {
  const { id } = req.params;
  const {
    title, content
  } = req.body;


  const updatedAt = knex.fn.now();

  knex('post').where({ id }).update({ title, content, upvotes, downvotes, updatedAt })
    .then((response) => {
      res.status(200).json({ success: response });
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
};

const deletePost = (req, res) => {
  const { id } = req.params;

  knex('post').where({ id }).del()
    .then((response) => {
      res.status(200).json({ success: response });
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  editPost,
  deletePost,
};
