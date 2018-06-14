const knex = require('../../database/db.js');
const uuidv4 = require('uuid/v4');

const getPosts = (req, res) => {
  knex('post')
    .then((response) => {
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
    title, content,
  } = req.body;
  const updatedAt = knex.fn.now();

  knex('post').where({ id }).update({ title, content, updatedAt })
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
