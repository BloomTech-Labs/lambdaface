
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

module.exports = {
  httpCodes: {
    SUCCESS_CODE: 200,
    CREATED_CODE: 201,
    NOT_FOUND_ERROR: 404,
    USER_ERROR: 422,
    SERVER_ERRROR: 500,
  },
  _joinUser,
};