const knex = require('../../database/db.js');
const uuidv4 = require('uuid/v4');

const isChildComment = (req, res, next) => {
  req.child = req.path.indexOf('child') !== -1
    || req.body.parentType === 'comment';

  req.table  = req.child
    ? 'child_comment'
    : 'comment';
  next();
}

const _joinUser = (table) => [
  knex('user')
  .select([ 'id as userId', 'firstName', 'lastName', 'profilePicture' ])
  .groupBy('id').as('x'),
  'x.userId',
  `${table}.userId`
];

const getComments = (req, res) => {

  const { table, child, params: { parentId }, } = req;

  knex(table)
    .where({ parentId })
    .join( ..._joinUser(table) )
    .orderBy('createdAt', 'desc')
    .then(async (response) => {
      console.log(response)
      // todo votes
      for (let comment of response) {
        comment.comments = await (() => {
          if (!child) {
            return knex('child_comment')
              .where({ parentId: comment.id })
              .join( ..._joinUser('child_comment') );
          }
          return [];
        })();
      }
  
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
};

const createComment = (req, res) => {
  const id = uuidv4();
  const { table, child, body: {
    content, userId, parentId, parentType,
  }, } = req;

  knex.insert({
    id, content, userId, parentId, parentType,
  }).into(table)
    .then(async (response) => {

      if (!child) {
        await knex('post')
          .where({ id: parentId })
          .increment('commentCount', 1);
      }

      res.status(201).json({ success: response });
    })
    .catch((err) => {
      res.status(422).json({ error: err });
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
    .catch((err) => {
      res.status(422).json({ error: err });
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
    .catch((err) => {
      res.status(422).json({ error: err });
    });
};

module.exports = {
  isChildComment,
  getComments,
  createComment,
  editComment,
  deleteComment,
};
