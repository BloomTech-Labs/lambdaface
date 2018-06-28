const knex = require('../../database/db.js');
const uuidv4 = require('uuid/v4');

const postVote = async (req, res) => {
  const id = uuidv4();
  const {
    userId, parentId, voteType, parentType,
  } = req.body;

  knex
    .insert({ id, userId, parentId, voteType, parentType })
    .into('vote')
    .then((response) => {
      res.status(201).json({ success: response });
    })
    .catch((error) => {
      knex('vote')
        .where({ userId, parentId})
        .update({ voteType })
        .then((response) => {
          res.status(204).json({ success: response, success_type: 'updated' })
        })
        .catch((err) => res.status(422).json({ error, update_error: err }));
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
