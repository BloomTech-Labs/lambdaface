const knex = require('../../database/db.js');
const uuidv4 = require('uuid/v4');

const { httpCodes } = require('./helpers.js')

const {
  SUCCESS_CODE,
  CREATED_CODE,
  USER_ERROR,
} = httpCodes;

const addFollower = (req, res) => {
  const id = uuidv4();
  const { userId, parentId } = req.body;

  knex
    .insert({ id, userId, parentId })
    .into('follow')
    .then(response => {
      res.status(CREATED_CODE).json({ success: response });
    })
    .catch((error) => {
      res.status(USER_ERROR).json({ error });
    });
};

const removeFollower = (req,res) => {
  const { userId, parentId } = req.body;

  knex('follow')
    .where({ userId, parentId })
    .del()
    .then((response) => {
      res.status(SUCCESS_CODE).json({ success: response });
    })
    .catch((error) => {
      res.status(USER_ERROR).json({ error });
    });
};

module.exports = {
  addFollower,
  removeFollower
};
