const knex = require('../../database/db.js');
const uuidv4 = require('uuid/v4');

const postVote = (req, res) => {
  const id = uuidv4();
  const {
    userId, parentId, voteType,
  } = req.body;

  knex.insert({
    id, userId, parentId, voteType,
  }).into('vote')
    .then((response) => {
      res.status(201).json({ success: response });
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
};

/* development only */
const getVotes = (req, res) => {
  knex('vote')
   .then(response => res.status(200).json(response));
}

module.exports = {
  postVote,
  getVotes,
};
