const uuidv4 = require('uuid/v4');

const knex = require('../../database/db.js');
const { _joinUser, _joinVote } = require('./helpers.js');

const { sendOrStore } = require('../controllers/webSockets');

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
    .leftJoin( ..._joinVote(table, 'INC') )
    .leftJoin( ..._joinVote(table, 'DEC', 'dv') )
    .orderBy('createdAt', 'asc')
    .then(async (response) => {
      if (!child) {
        for (let i = 0; i < response.length; i++) {
          response[i].comments = await knex('reply')
            .where({ parentId: response[i].id })
            .orderBy('createdAt', 'asc')
            .join( ..._joinUser('reply') )
            .leftJoin( ..._joinVote('reply', 'INC') )
            .leftJoin( ..._joinVote('reply', 'DEC', 'dv') );
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
      const sourceId = userId;
      let targetId, postId, type
      if (!child) {
        type = 'comment';
        postId = parentId;
        await knex('post')
          .where({ id: parentId })
          .increment('commentCount', 1)
        await knex('post')
          .where({ id: parentId })
          .select('post.userId as targetId')
          .then(res => {
            console.log('Were a comment, so res looks like:', res);
            targetId = res[0].targetId;
          });
      } else {
        type = 'reply'
        await knex('comment')
          .where('comment.id', parentId)
          .join('post', 'comment.parentId', '=', 'post.id')
          .select('post.id as postId', 'comment.userId as targetId')
          .then(res => {
            postId = res[0].postId;
            targetId = res[0].targetId;
          })
      }

      sendOrStore(userId, { sourceId, targetId, postId, type }); 
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
