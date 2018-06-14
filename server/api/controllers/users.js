const knex = require('../../database/db.js');
const uuidv4 = require('uuid/v4');

const createUser = (req, res) => {
  const id = uuidv4();
  const {
    firstName, lastName, email,
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

module.exports = {
  createUser,
};
