const knex = require('../../database/db.js');

const { _joinUser } = require('./helpers');

const getReplyById = (req, res) => {
  const { id } = req.params;

  /*
    knex('user')
    .select([ 'id as userId', 'firstName', 'lastName', 'profilePicture' ])
    .groupBy('id').as('x'),
  'x.userId',
  `${table}.userId`
  */

  knex('reply')
    .where({ id })
    .join(
      knex('comment')
        .select([ 'id as pid', 'parentId as postId' ])
        .groupBy('pid').as('c'),
      'c.pid',
      'reply.parentId'
    )
    .join(
      knex('post')
        .select('id as postId', 'userId as postUser')
        .groupBy('postId').as('p'),
      'p.postId',
      'c.postId'
    )
    .join(
      knex('user')
        .select([ 'id as postUser', 'firstName as postFN', 'lastName as postLN' ])
        .groupBy('postUser').as('u'),
      'u.postUser',
      'p.postUser'
    )
    .join(
      knex('user')
        .select([ 'id as userId', 'firstName', 'lastName' ])
        .groupBy('userID').as('ou'),
      'ou.userId',
      'reply.userId'
    )
    .then((response) => {
      res.status(200).json(response)
    })
    .catch(error => res.status(500).json({err: error.message}))
}

module.exports = {
  getReplyById
}