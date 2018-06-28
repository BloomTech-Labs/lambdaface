
const knex = require('../../database/db.js');
/**
 * Joins user to incomming query
 * @returns { array } Array representation of query join.
 */

const _joinUser = (table) => [
  knex('user')
    .select([ 'id as userId', 'firstName', 'lastName', 'profilePicture' ])
    .groupBy('id').as('x'),
  'x.userId',
  `${table}.userId`
];

const _joinVote = (table, voteType, t = 'v') => {
  const voteName = voteType === 'INC'
    ? "upvotes"
    : "downvotes";
  
  return [
    knex('vote')
      .select('parentId as voteId', 'voteType')
      .count({ [ voteName ]: ['voteType'] })
      .where({ voteType })
      .groupBy('voteId').as(t),
    `${table}.id`,
    `${t}.voteId`
  ];
};

module.exports = {
  httpCodes: {
    SUCCESS_CODE: 200,
    CREATED_CODE: 201,
    NOT_FOUND_ERROR: 404,
    USER_ERROR: 422,
    SERVER_ERRROR: 500,
  },
  _joinUser,
  _joinVote,
};