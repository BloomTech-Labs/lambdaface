const knex = require('../../database/db.js');

const getPosts = (req, res) => {
  knex('Posts')
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
};

const getPostById = (req, res) => {
  const { id } = req.params;

  knex('Posts').where({ id })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
};

const createPost = (req, res) => {
  const { title, content } = req.body;
  // Retrieve author data as well
  knex.insert({ title, content }).into('Posts')
    .then((response) => {
      res.status(201).json({ success: true });
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
};

const editPost = (req, res) => {
  const { id } = req.params;
  const post = req.body;

  knex('Posts').where({ id }).update(post)
    .then((response) => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
};

const deletePost = (req, res) => {
  const { id } = req.params;

  knex('Posts').where({ id }).del()
    .then((response) => {
      res.status(200).json({ success: true });
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
