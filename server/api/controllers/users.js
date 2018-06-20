const knex = require('../../database/db.js');

const createUser = (req, res) => {
  const {
    id, firstName, lastName, email,
  } = req.body;

  knex.insert({
    id, firstName, lastName, email,
  }).into('user')
    .then((response) => {
      res.status(201).json({ success: response });
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
};

const editUser = (req, res) => {
  const { id } = req.params;
  const {
    firstName, lastName, email, profilePicture
  } = req.body;

  knex('user').where({ id }).update({ firstName, lastName, email, profilePicture })
    .then((response) => {
      res.status(200).json({ success: response });
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
}

// For dev purposes
const viewUsers = (req, res) => {
  knex('user')
    .then((response) => {
      res.status(200).json({ users: response })
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

module.exports = {
  createUser,
  viewUsers,
  editUser,
};
