const knex = require('../../database/db.js');
const uuidv4 = require('uuid/v4');

const createUser = (req, res) => {
  const id = uuidv4();
  const {
    first_name, last_name, email
  } = req.body;

  knex.insert({
    id, first_name, last_name, email,
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
