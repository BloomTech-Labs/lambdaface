const knex = require('../../database/db.js');
const uuidv4 = require('uuid/v4');

const getComments = (req, res) => {
  const { parentID } = req.params;
  knex('comment')
    .where('parent_id', parentID)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
};

const createComment = (req, res) => {
  const id = uuidv4();
  const {
    content, user_id, parent_id, parent_type,
  } = req.body;

  knex.insert({
    id, content, user_id, parent_id, parent_type,
  }).into('comment')
    .then((response) => {
      res.status(201).json({ success: response });
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
};

const editComment = (req, res) => {
  const { id } = req.params;
  const comment = req.body;

  knex('comment').where({ id }).update(comment)
    .then((response) => {
      res.status(200).json({ success: response });
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
};

const deleteComment = (req, res) => {
  const { id } = req.params;
  const content = 'Message Deleted';

  knex('comment').where({ id }).update({ content })
    .then((response) => {
      res.status(200).json({ success: response });
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
};

module.exports = {
  getComments,
  createComment,
  editComment,
  deleteComment,
};
