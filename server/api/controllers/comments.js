const uuidv4 = require('uuid/v4');

const knex = require('../../database/db.js');
const { _joinUser } = require('./helpers.js');

/**
 * Middleware to set child flag.
 * @property { boolean } req.child - flag if comment is a child of a comment
 * @property { string } req.table - the name of the table knex will query
 */

const isChildComment = (req, res, next) => {
  req.child = req.path.indexOf('child') !== -1
    || req.body.parentType === 'comment';

  req.table  = req.child
    ? 'reply'
    : 'comment';
  next();
}

/**
 * function for reading list of comments associated with a particular post.
 * @const { string } table - table name to query.
 * @const { boolean } child - flag if request is for a child comment.
 * @const { string } parentId - UUID associated to with parent post or comment.
 */

const getComments = (req, res) => {

  const { table, child, params: { parentId }, } = req;

  knex(table)
    .where({ parentId })
    .join( ..._joinUser(table) )
    .orderBy('createdAt', 'asc')
    .then(async (response) => {
      // todo votes   
      if (!child) {
        for (let i = 0; i < response.length; i++) {
          response[i].comments = await knex('reply')
          .where({ parentId: response[i].id })
          .orderBy('createdAt', 'asc')
          .join( ..._joinUser('reply') );
        }
      }
  
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
};

const createComment = (req, res) => {
  const id = uuidv4();
  const { table, child, body: {
    content, userId, parentId,
  }, } = req;

  knex
    .insert({ id, content, userId, parentId })
    .into(table)
    .then(async (response) => {
      if (!child) {
       await knex('post')
          .where({ id: parentId })
          .increment('commentCount', 1);
      }

      res.status(201).json({ success: response });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
};

const editComment = (req, res) => {
  const { 
    table,
    params: { id },
    body: comment 
  } = req;


  knex(table).where({ id }).update(comment)
    .then((response) => {
      res.status(204).json({ success: response });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
};

const deleteComment = (req, res) => {
  const { 
    table,
    params: { id },
  } = req;

  const content = 'Message Deleted';

  knex(table).where({ id }).update({ content })
    .then((response) => {
      res.status(204).json({ success: response });
    })
    .catch((error) => {
      res.status(422).json({ error });
    });
};

module.exports = {
  isChildComment,
  getComments,
  createComment,
  editComment,
  deleteComment,
};
