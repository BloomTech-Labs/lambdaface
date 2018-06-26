const knex = require('../../database/db.js');
const uuidv4 = require('uuid/v4');

const postVote = (req, res) => {
  const id = uuidv4();
  const {
    userId, parentId, voteType, parentType,
  } = req.body;

  knex.insert({
    id, userId, parentId, voteType, parentType,
  }).into('vote')
    .then((response) => {
      res.status(201).json({ success: response });
    })
    .catch(() => {
      knex('vote')
        .where({ userId, parentId })
        .update({ voteType })
        .then((response) => {
          if (!response) {
            throw new Error('incorrect userId or parentId');
          }
          res.status(200).json({ success: 'updated', response});
        })
        .catch(({ message }) => {
          res.status(422).json({ update_error: message });
        });
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
