const knex = require('../../database/db.js');
const uuidv4 = require('uuid/v4');

const postVote = (req, res) => {
  const id = uuidv4();
  const {
    userId, parentId, voteType,
  } = req.body;

  knex.insert({
    id, userId, parentId, voteType,
  }).into('votes')
    .then((response) => {
      res.status(201).json({ success: response });
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
};

module.exports = {
  postVote,
};
